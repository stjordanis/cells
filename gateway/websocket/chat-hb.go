package websocket

import (
	"context"
	"sync"
	"time"

	"github.com/pydio/cells/common/proto/chat"
)

var (
	hbb      map[string]*heartBeater
	hbbLocks *sync.Mutex
)

type heartBeater struct {
	remove func()
	rooms  map[string]*chat.ChatRoom
	ping   chan *chat.ChatRoom
	stop   chan bool
}

func (h *heartBeater) Start() {
	go func() {
		defer close(h.ping)
		defer close(h.stop)
		for {
			select {
			case r := <-h.ping:
				h.rooms[r.Uuid] = r
			case <-time.After(20 * time.Second):
				h.remove()
				return
			case <-h.stop:
				return
			}
		}
	}()
}

func init() {
	hbb = make(map[string]*heartBeater)
	hbbLocks = &sync.Mutex{}
}

func (c *ChatHandler) heartbeat(username string, room *chat.ChatRoom) {
	hbbLocks.Lock()
	defer hbbLocks.Unlock()
	var heartbeater *heartBeater
	if hb, ok := hbb[username]; ok {
		heartbeater = hb
	} else {
		heartbeater = &heartBeater{
			remove: func() {
				hbbLocks.Lock()
				defer hbbLocks.Unlock()
				for _, roomChat := range heartbeater.rooms {
					if f, e := c.findOrCreateRoom(context.Background(), roomChat, false); e == nil && f != nil {
						if save := c.removeUserFromRoom(f, username); save {
							c.getChatClient().PutRoom(context.Background(), &chat.PutRoomRequest{Room: f})
						}
					}
				}
				delete(hbb, username)
			},
			ping:  make(chan *chat.ChatRoom),
			stop:  make(chan bool),
			rooms: make(map[string]*chat.ChatRoom),
		}
		heartbeater.Start()
		hbb[username] = heartbeater
	}
	go func() {
		defer func() {
			if r := recover(); r != nil {
				// avoid send on close channel if ever it happens
			}
		}()
		heartbeater.ping <- room
	}()
}
