"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react'], function (React) {
    return function (_React$Component) {
        _inherits(Header, _React$Component);

        function Header(props) {
            _classCallCheck(this, Header);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, propsU));
        }

        _createClass(Header, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "header" },
                    React.createElement(
                        "h1",
                        { className: "title" },
                        this.props.content
                    ),
                    React.createElement("button", { className: "refreshButton", onClick: this.refreshButton })
                );
            }
        }, {
            key: "refreshButton",
            value: function refreshButton(e) {
                console.log('asking for events...');
                this.props.socket.emit('refreshData');

                e.preventDefault();
                e.stopPropagation();
            }
        }]);

        return Header;
    }(React.Component);
});