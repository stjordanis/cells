/*
 * Copyright 2007-2017 Charles du Jeu - Abstrium SAS <team (at) pyd.io>
 * This file is part of Pydio.
 *
 * Pydio is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _materialUiStyles = require('material-ui/styles');

/**
 * Two columns layout used for Workspaces and Plugins editors
 */

var PaperEditorLayout = (function (_React$Component) {
    _inherits(PaperEditorLayout, _React$Component);

    function PaperEditorLayout(props) {
        _classCallCheck(this, PaperEditorLayout);

        _React$Component.call(this, props);
        this.state = { forceLeftOpen: false };
    }

    PaperEditorLayout.prototype.toggleMenu = function toggleMenu() {
        var crtLeftOpen = this.state && this.state.forceLeftOpen;
        this.setState({ forceLeftOpen: !crtLeftOpen });
    };

    PaperEditorLayout.prototype.render = function render() {
        var _props = this.props;
        var muiTheme = _props.muiTheme;
        var closeAction = _props.closeAction;
        var className = _props.className;
        var title = _props.title;
        var titleActionBar = _props.titleActionBar;
        var leftNav = _props.leftNav;
        var contentFill = _props.contentFill;
        var children = _props.children;
        var forceLeftOpen = this.state.forceLeftOpen;

        var styles = {
            title: {
                backgroundColor: muiTheme.palette.accent2Color,
                borderRadius: '2px 2px 0 0',
                display: 'flex',
                alignItems: 'center',
                height: 56,
                padding: '0 20px'
            },
            titleH2: {
                color: 'white',
                flex: 1,
                fontSize: 18,
                padding: 0,
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
            titleBar: {
                display: 'flex',
                alignItems: 'center'
            }
        };
        var closeButton = undefined;
        if (closeAction) {
            closeButton = _react2['default'].createElement(_materialUi.IconButton, {
                tooltip: _pydio2['default'].getMessages()[86],
                iconClassName: 'mdi mdi-close',
                onTouchTap: closeAction,
                iconStyle: { color: 'white' }
            });
        }
        return _react2['default'].createElement(
            'div',
            { className: "paper-editor-content layout-fill vertical-layout" + (className ? ' ' + className : '') },
            _react2['default'].createElement(
                'div',
                { className: 'paper-editor-title', style: styles.title },
                _react2['default'].createElement(
                    'h2',
                    { style: styles.titleH2 },
                    title,
                    ' ',
                    _react2['default'].createElement(
                        'div',
                        { className: 'left-picker-toggle' },
                        _react2['default'].createElement(_materialUi.IconButton, { iconClassName: 'icon-caret-down', onClick: this.toggleMenu.bind(this) })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { style: styles.titleBar },
                    titleActionBar
                ),
                closeButton
            ),
            _react2['default'].createElement(
                'div',
                { className: 'layout-fill main-layout-nav-to-stack' },
                leftNav && _react2['default'].createElement(
                    'div',
                    { className: "paper-editor-left" + (forceLeftOpen ? ' picker-open' : ''), onClick: this.toggleMenu.bind(this) },
                    leftNav
                ),
                _react2['default'].createElement(
                    'div',
                    { className: "layout-fill paper-editor-right" + (contentFill ? ' vertical-layout' : ''), style: contentFill ? {} : { overflowY: 'auto' } },
                    children
                )
            )
        );
    };

    return PaperEditorLayout;
})(_react2['default'].Component);

PaperEditorLayout.propTypes = {
    title: _react2['default'].PropTypes.any,
    titleActionBar: _react2['default'].PropTypes.any,
    closeAction: _react2['default'].PropTypes.func,
    leftNav: _react2['default'].PropTypes.any,
    contentFill: _react2['default'].PropTypes.bool,
    className: _react2['default'].PropTypes.string
};
exports.PaperEditorLayout = PaperEditorLayout = _materialUiStyles.muiThemeable()(PaperEditorLayout);
PaperEditorLayout.actionButton = function (label, icon, action) {
    var disabled = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    return _react2['default'].createElement(_materialUi.IconButton, {
        tooltip: label,
        iconClassName: icon,
        disabled: disabled,
        onTouchTap: action,
        iconStyle: { color: disabled ? 'rgba(255,255,255,0.5)' : 'white' }
    });
};

/**
 * Navigation subheader used by PaperEditorLayout
 */

var PaperEditorNavHeader = (function (_React$Component2) {
    _inherits(PaperEditorNavHeader, _React$Component2);

    function PaperEditorNavHeader() {
        _classCallCheck(this, PaperEditorNavHeader);

        _React$Component2.apply(this, arguments);
    }

    /**
     * Navigation entry used by PaperEditorLayout.
     */

    PaperEditorNavHeader.prototype.render = function render() {

        return _react2['default'].createElement(
            'div',
            { className: "mui-subheader", style: { fontSize: 13, fontWeight: 500, color: 'rgba(0, 0, 0, 0.25)', lineHeight: '48px', paddingLeft: 16 } },
            this.props.children,
            this.props.label
        );
    };

    return PaperEditorNavHeader;
})(_react2['default'].Component);

var PaperEditorNavEntry = (function (_React$Component3) {
    _inherits(PaperEditorNavEntry, _React$Component3);

    function PaperEditorNavEntry() {
        _classCallCheck(this, PaperEditorNavEntry);

        _React$Component3.apply(this, arguments);
    }

    PaperEditorNavEntry.prototype.onClick = function onClick() {
        this.props.onClick(this.props.keyName);
    };

    PaperEditorNavEntry.prototype.captureDropDownClick = function captureDropDownClick() {
        if (this.preventClick) {
            this.preventClick = false;
            return;
        }
        this.props.onClick(this.props.keyName);
    };

    PaperEditorNavEntry.prototype.dropDownChange = function dropDownChange(event, index, item) {
        this.preventClick = true;
        this.props.dropDownChange(item);
    };

    PaperEditorNavEntry.prototype.render = function render() {

        if (!this.props.dropDown || !this.props.dropDownData) {
            return _react2['default'].createElement(
                'div',
                {
                    className: 'menu-entry' + (this.props.keyName === this.props.selectedKey ? ' menu-entry-selected' : '') + (this.props.isLast ? ' last' : ''),
                    onClick: this.onClick.bind(this) },
                this.props.children,
                this.props.label
            );
        }

        // dropDown & dropDownData are loaded
        var menuItemsTpl = [{ text: this.props.label, payload: '-1' }];
        if (this.props.dropDownDefaultItems) {
            menuItemsTpl = menuItemsTpl.concat(this.props.dropDownDefaultItems);
        }
        this.props.dropDownData.forEach(function (v, k) {
            menuItemsTpl.push({ text: v.label, payload: v });
        });
        return _react2['default'].createElement(
            'div',
            { onClick: this.captureDropDownClick.bind(this), className: 'menu-entry-dropdown' + (this.props.keyName === this.props.selectedKey ? ' menu-entry-selected' : '') + (this.props.isLast ? ' last' : '') },
            _react2['default'].createElement(_materialUi.DropDownMenu, {
                menuItems: menuItemsTpl,
                className: 'dropdown-full-width',
                style: { width: 256 },
                autoWidth: false,
                onChange: this.dropDownChange.bind(this)
            })
        );
    };

    return PaperEditorNavEntry;
})(_react2['default'].Component);

exports.PaperEditorLayout = PaperEditorLayout;
exports.PaperEditorNavEntry = PaperEditorNavEntry;
exports.PaperEditorNavHeader = PaperEditorNavHeader;

// Drop Down Data
