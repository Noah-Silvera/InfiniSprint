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