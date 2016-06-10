"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react'], function (React) {

    return function (_React$Component) {
        _inherits(Heading, _React$Component);

        function Heading() {
            _classCallCheck(this, Heading);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Heading).apply(this, arguments));
        }

        _createClass(Heading, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "heading" },
                    React.createElement(
                        "h3",
                        { className: "title" },
                        this.props.content
                    )
                );
            }
        }]);

        return Heading;
    }(React.Component);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL0hlYWRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sQ0FBQyxPQUFELENBQVAsRUFBaUIsVUFBUyxLQUFULEVBQWU7O0FBRTVCO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FDWTtBQUNKLHVCQUFRO0FBQUE7b0JBQUEsRUFBSyxXQUFZLFNBQWpCO29CQUNJO0FBQUE7d0JBQUEsRUFBSSxXQUFZLE9BQWhCO3dCQUF5QixLQUFLLEtBQUwsQ0FBVztBQUFwQztBQURKLGlCQUFSO0FBR0g7QUFMTDs7QUFBQTtBQUFBLE1BQTZCLE1BQU0sU0FBbkM7QUFPSCxDQVREIiwiZmlsZSI6ImNsaWVudC9jb21wb25lbnRzL0hlYWRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWydyZWFjdCddLGZ1bmN0aW9uKFJlYWN0KXtcclxuICAgIFxyXG4gICAgcmV0dXJuIGNsYXNzIEhlYWRpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgICAgIHJlbmRlcigpe1xyXG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lID0gXCJoZWFkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWUgPSBcInRpdGxlXCI+e3RoaXMucHJvcHMuY29udGVudH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
