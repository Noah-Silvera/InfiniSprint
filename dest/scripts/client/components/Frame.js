'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', 'components/ActionList', 'components/Header', 'components/Heading', 'socket-io'], function (React, ReactDOM, ActionList, Header, Heading, io) {

    // This frame represents the main
    // component of the app - the frame that renders the backlog and sprint items
    // STATE
    // * This component holds the state of the backlog and sprint lists
    // * allowing you to drag between lists easily by keeping track of both.
    // PROPS
    return function (_React$Component) {
        _inherits(Frame, _React$Component);

        function Frame(props) {
            _classCallCheck(this, Frame);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Frame).call(this, props));

            _this.socket = io('http://localhost:80'); // io is imported in index.html   
            _this.dragItemEvent = null;
            _this.dragItemObj = null;
            if (!_this.socket) {
                var msg = "Could not initialize socket";
                console.error(msg);
                throw new Error(msg);
            }

            // Pull the google calender item's from the server, process them and use them as our state ( test data for now )
            // State should be of the following form
            // { "backlog" : [
            //      {
            //        "content": "have a great life",
            //        "dataId": 0,
            //        "rank": 1
            //      }, ...
            //    ],
            //  "sprint" : [
            //        {
            //          "content": "Love Everyone",
            //          "dataId": 2,
            //          "rank": 1
            //        }, ...
            //      ]
            //    }
            // }
            // Every list of google cal tasks should have unique rank within that list
            // but every single task must have a unique dataID
            _this.data = { "backlog": [{
                    "content": "have a great life",
                    "dataId": 0,
                    "rank": 1
                }, {
                    "content": "have fun",
                    "dataId": 1,
                    "rank": 2
                }, {
                    "content": "eat bread",
                    "dataId": 2,
                    "rank": 3
                }, {
                    "content": "play games",
                    "dataId": 3,
                    "rank": 4
                }, {
                    "content": "be happy",
                    "dataId": 4,
                    "rank": 5
                }],
                "sprint": [{
                    "content": "Do things",
                    "dataId": 5,
                    "rank": 1
                }, {
                    "content": "get money",
                    "dataId": 6,
                    "rank": 2
                }]
            };

            return _this;
        }

        _createClass(Frame, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                ReactDOM.findDOMNode(this).addEventListener("itemLeave", this.itemLeave);
                ReactDOM.findDOMNode(this).addEventListener("itemDragged", this.itemDragged);

                this.socket.on('eventsUpdated', function updateEvents(content) {
                    console.log('processing recieved events...');
                    console.log(content);
                    // this.data['sprint'] = content
                });

                this.socket.on('eventDeleted', function updateEvents(content) {
                    console.log('processing recieved events...');
                    console.log(content);
                    // this.data['sprint'] = content
                });

                // this.socket.emit('getSprintItems')
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                ReactDOM.findDOMNode(this).removeEventListener("itemLeave", this.itemLeave);
                ReactDOM.findDOMNode(this).removeEventListener("itemDragged", this.itemDragged);
            }
        }, {
            key: 'itemLeave',
            value: function itemLeave(e) {
                // console.log('Item left list')
            }
        }, {
            key: 'itemDragged',
            value: function itemDragged(e) {
                this.dragItem = e.detail.dragItem;
                this.dragItemListId = e.detail.dragItemListId;
                console.log('current dragged item = ');
                console.log(this.dragItem);
                // require to refresh the props of the actionList
                this.forceUpdate();
            }

            // Renders the frame for the backlog and action items using ActionLists and headings
            // binds the dragging event

        }, {
            key: 'render',
            value: function render() {

                return React.createElement(
                    'div',
                    { className: 'frame' },
                    React.createElement(Header, { content: 'InfiniSprint', socket: this.socket }),
                    React.createElement(Heading, { content: 'Current Sprint' }),
                    React.createElement(ActionList, { actions: this.data['sprint'], dataId: 0, socket: this.socket, dragItem: this.dragItem }),
                    React.createElement(Heading, { content: 'Backlog' }),
                    React.createElement(ActionList, { actions: this.data['backlog'], dataId: 1, socket: this.socket, dragItem: this.dragItem })
                );
            }
        }]);

        return Frame;
    }(React.Component);
});