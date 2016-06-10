'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react'], function (React) {

    // this class renders an action item
    // It is a draggable class, but does not handle drags itself
    // STATELESS
    // PROPS
    // * rank - key for sorting order
    // * Content - Content of div
    // * data-id - unique ID for handling drag events
    return function (_React$Component) {
        _inherits(Action, _React$Component);

        function Action() {
            _classCallCheck(this, Action);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(Action).apply(this, arguments));
        }

        _createClass(Action, [{
            key: 'render',
            value: function render() {
                console.log('this is called');
                return React.createElement(
                    'div',
                    { className: 'action', draggable: 'true', 'data-id': this.props.dataId },
                    React.createElement(
                        'p',
                        { className: 'row' },
                        this.props.rank,
                        '    '
                    ),
                    React.createElement(
                        'p',
                        { className: 'row' },
                        this.props.content
                    )
                );
            }
        }]);

        return Action;
    }(React.Component);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL0FjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLE9BQUQsQ0FBUCxFQUFpQixVQUFTLEtBQVQsRUFBZTs7Ozs7Ozs7O0FBUzVCO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FHaUI7QUFDTCx3QkFBUSxHQUFSLENBQVksZ0JBQVo7QUFDQSx1QkFBUTtBQUFBO29CQUFBLEVBQUssV0FBWSxRQUFqQixFQUEwQixXQUFZLE1BQXRDLEVBQTZDLFdBQVcsS0FBSyxLQUFMLENBQVcsTUFBbkU7b0JBQ1E7QUFBQTt3QkFBQSxFQUFHLFdBQVksS0FBZjt3QkFBc0IsS0FBSyxLQUFMLENBQVcsSUFBakM7d0JBQUE7QUFBQSxxQkFEUjtvQkFDc0Q7QUFBQTt3QkFBQSxFQUFHLFdBQVksS0FBZjt3QkFBc0IsS0FBSyxLQUFMLENBQVc7QUFBakM7QUFEdEQsaUJBQVI7QUFJSDtBQVRUOztBQUFBO0FBQUEsTUFDeUIsTUFBTSxTQUQvQjtBQVlILENBckJEIiwiZmlsZSI6ImNsaWVudC9jb21wb25lbnRzL0FjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbJ3JlYWN0J10sZnVuY3Rpb24oUmVhY3Qpe1xyXG5cclxuICAgIC8vIHRoaXMgY2xhc3MgcmVuZGVycyBhbiBhY3Rpb24gaXRlbVxyXG4gICAgLy8gSXQgaXMgYSBkcmFnZ2FibGUgY2xhc3MsIGJ1dCBkb2VzIG5vdCBoYW5kbGUgZHJhZ3MgaXRzZWxmXHJcbiAgICAvLyBTVEFURUxFU1NcclxuICAgIC8vIFBST1BTXHJcbiAgICAvLyAqIHJhbmsgLSBrZXkgZm9yIHNvcnRpbmcgb3JkZXJcclxuICAgIC8vICogQ29udGVudCAtIENvbnRlbnQgb2YgZGl2XHJcbiAgICAvLyAqIGRhdGEtaWQgLSB1bmlxdWUgSUQgZm9yIGhhbmRsaW5nIGRyYWcgZXZlbnRzXHJcbiAgICByZXR1cm4gKCBcclxuICAgICAgICBjbGFzcyBBY3Rpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgY2FsbGVkJylcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWUgPSBcImFjdGlvblwiIGRyYWdnYWJsZSA9IFwidHJ1ZVwiIGRhdGEtaWQgPSB7dGhpcy5wcm9wcy5kYXRhSWR9ID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWUgPSBcInJvd1wiPnt0aGlzLnByb3BzLnJhbmt9ICAgIDwvcD48cCBjbGFzc05hbWUgPSBcInJvd1wiPnt0aGlzLnByb3BzLmNvbnRlbnR9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4pXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
