// Code generated by protoc-gen-micro. DO NOT EDIT.
// source: front.proto

/*
Package front is a generated protocol buffer package.

It is generated from these files:
	front.proto

It has these top-level messages:
	ExposedParametersRequest
	ExposedParameter
	ExposedParametersResponse
*/
package front

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

import (
	client "github.com/micro/go-micro/client"
	server "github.com/micro/go-micro/server"
	context "context"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ client.Option
var _ server.Option

// Client API for ManifestService service

type ManifestServiceClient interface {
	ExposedParameters(ctx context.Context, in *ExposedParametersRequest, opts ...client.CallOption) (*ExposedParametersResponse, error)
}

type manifestServiceClient struct {
	c           client.Client
	serviceName string
}

func NewManifestServiceClient(serviceName string, c client.Client) ManifestServiceClient {
	if c == nil {
		c = client.NewClient()
	}
	if len(serviceName) == 0 {
		serviceName = "manifestservice"
	}
	return &manifestServiceClient{
		c:           c,
		serviceName: serviceName,
	}
}

func (c *manifestServiceClient) ExposedParameters(ctx context.Context, in *ExposedParametersRequest, opts ...client.CallOption) (*ExposedParametersResponse, error) {
	req := c.c.NewRequest(c.serviceName, "ManifestService.ExposedParameters", in)
	out := new(ExposedParametersResponse)
	err := c.c.Call(ctx, req, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// Server API for ManifestService service

type ManifestServiceHandler interface {
	ExposedParameters(context.Context, *ExposedParametersRequest, *ExposedParametersResponse) error
}

func RegisterManifestServiceHandler(s server.Server, hdlr ManifestServiceHandler, opts ...server.HandlerOption) {
	s.Handle(s.NewHandler(&ManifestService{hdlr}, opts...))
}

type ManifestService struct {
	ManifestServiceHandler
}

func (h *ManifestService) ExposedParameters(ctx context.Context, in *ExposedParametersRequest, out *ExposedParametersResponse) error {
	return h.ManifestServiceHandler.ExposedParameters(ctx, in, out)
}
