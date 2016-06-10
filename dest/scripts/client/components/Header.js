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

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL0hlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLE9BQUQsQ0FBUCxFQUFpQixVQUFTLEtBQVQsRUFBZTtBQUM1QjtBQUFBOztBQUNJLHdCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw2RkFDUixLQURRO0FBRWpCOztBQUhMO0FBQUE7QUFBQSxxQ0FLWTtBQUNKLHVCQUFVO0FBQUE7b0JBQUEsRUFBSyxXQUFZLFFBQWpCO29CQUNFO0FBQUE7d0JBQUEsRUFBSSxXQUFZLE9BQWhCO3dCQUF5QixLQUFLLEtBQUwsQ0FBVztBQUFwQyxxQkFERjtvQkFFRSxnQ0FBUSxXQUFVLGVBQWxCLEVBQWtDLFNBQVcsS0FBSyxhQUFsRDtBQUZGLGlCQUFWO0FBSUg7QUFWTDtBQUFBO0FBQUEsMENBWWtCLENBWmxCLEVBWW9CO0FBQ1osd0JBQVEsR0FBUixDQUFZLHNCQUFaO0FBQ0EscUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsQ0FBdUIsYUFBdkI7O0FBRUEsa0JBQUUsY0FBRjtBQUNBLGtCQUFFLGVBQUY7QUFDSDtBQWxCTDs7QUFBQTtBQUFBLE1BQTRCLE1BQU0sU0FBbEM7QUFvQkgsQ0FyQkQiLCJmaWxlIjoiY2xpZW50L2NvbXBvbmVudHMvSGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFsncmVhY3QnXSxmdW5jdGlvbihSZWFjdCl7XHJcbiAgICByZXR1cm4gY2xhc3MgSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZW5kZXIoKXtcclxuICAgICAgICAgICAgcmV0dXJuICggIDxkaXYgY2xhc3NOYW1lID0gXCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZSA9IFwidGl0bGVcIj57dGhpcy5wcm9wcy5jb250ZW50fTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicmVmcmVzaEJ1dHRvblwiIG9uQ2xpY2sgPSB7dGhpcy5yZWZyZXNoQnV0dG9ufSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVmcmVzaEJ1dHRvbihlKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Fza2luZyBmb3IgZXZlbnRzLi4uJylcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zb2NrZXQuZW1pdCgncmVmcmVzaERhdGEnKVxyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
