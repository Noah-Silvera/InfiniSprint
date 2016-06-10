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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21wb25lbnRzL0ZyYW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxPQUFPLENBQUMsT0FBRCxFQUFTLFdBQVQsRUFBcUIsdUJBQXJCLEVBQTZDLG1CQUE3QyxFQUFpRSxvQkFBakUsRUFBc0YsV0FBdEYsQ0FBUCxFQUEyRyxVQUFTLEtBQVQsRUFBZSxRQUFmLEVBQXdCLFVBQXhCLEVBQW1DLE1BQW5DLEVBQTBDLE9BQTFDLEVBQWtELEVBQWxELEVBQXNEOzs7Ozs7OztBQVE3SjtBQUFBOztBQUNJLHVCQUFZLEtBQVosRUFBa0I7QUFBQTs7QUFBQSxpR0FDUixLQURROztBQUVkLGtCQUFLLE1BQUwsR0FBYyxHQUFHLHFCQUFILENBQWQsQztBQUNBLGtCQUFLLGFBQUwsR0FBcUIsSUFBckI7QUFDQSxrQkFBSyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsZ0JBQUksQ0FBQyxNQUFLLE1BQVYsRUFBa0I7QUFDZCxvQkFBSSxNQUFNLDZCQUFWO0FBQ0Esd0JBQVEsS0FBUixDQUFjLEdBQWQ7QUFDQSxzQkFBTSxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQU47QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCRCxrQkFBSyxJQUFMLEdBQVksRUFBRSxXQUFZLENBQ2Q7QUFDSSwrQkFBVyxtQkFEZjtBQUVJLDhCQUFVLENBRmQ7QUFHSSw0QkFBUTtBQUhaLGlCQURjLEVBS1g7QUFDQywrQkFBVyxVQURaO0FBRUMsOEJBQVUsQ0FGWDtBQUdDLDRCQUFRO0FBSFQsaUJBTFcsRUFTWDtBQUNDLCtCQUFXLFdBRFo7QUFFQyw4QkFBVSxDQUZYO0FBR0MsNEJBQVE7QUFIVCxpQkFUVyxFQWFYO0FBQ0MsK0JBQVcsWUFEWjtBQUVDLDhCQUFVLENBRlg7QUFHQyw0QkFBUTtBQUhULGlCQWJXLEVBaUJYO0FBQ0MsK0JBQVcsVUFEWjtBQUVDLDhCQUFVLENBRlg7QUFHQyw0QkFBUTtBQUhULGlCQWpCVyxDQUFkO0FBdUJBLDBCQUFXLENBQ1g7QUFDSSwrQkFBVyxXQURmO0FBRUksOEJBQVUsQ0FGZDtBQUdJLDRCQUFRO0FBSFosaUJBRFcsRUFLUjtBQUNDLCtCQUFXLFdBRFo7QUFFQyw4QkFBVSxDQUZYO0FBR0MsNEJBQVE7QUFIVCxpQkFMUTtBQXZCWCxhQUFaOztBQS9CYztBQW1FakI7O0FBcEVMO0FBQUE7QUFBQSxnREFzRXVCO0FBQ2YseUJBQVMsV0FBVCxDQUFxQixJQUFyQixFQUEyQixnQkFBM0IsQ0FBNEMsV0FBNUMsRUFBeUQsS0FBSyxTQUE5RDtBQUNBLHlCQUFTLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkIsZ0JBQTNCLENBQTRDLGFBQTVDLEVBQTJELEtBQUssV0FBaEU7O0FBRUEscUJBQUssTUFBTCxDQUFZLEVBQVosQ0FBZSxlQUFmLEVBQWdDLFNBQVMsWUFBVCxDQUFzQixPQUF0QixFQUE4QjtBQUM5RCw0QkFBUSxHQUFSLENBQVksK0JBQVo7QUFDQSw0QkFBUSxHQUFSLENBQVksT0FBWjs7QUFFQyxpQkFKRDs7QUFNQSxxQkFBSyxNQUFMLENBQVksRUFBWixDQUFlLGNBQWYsRUFBK0IsU0FBUyxZQUFULENBQXNCLE9BQXRCLEVBQThCO0FBQzdELDRCQUFRLEdBQVIsQ0FBWSwrQkFBWjtBQUNBLDRCQUFRLEdBQVIsQ0FBWSxPQUFaOztBQUVDLGlCQUpEOzs7QUFRSDtBQXhGTDtBQUFBO0FBQUEsbURBMEYwQjtBQUNsQix5QkFBUyxXQUFULENBQXFCLElBQXJCLEVBQTJCLG1CQUEzQixDQUErQyxXQUEvQyxFQUE0RCxLQUFLLFNBQWpFO0FBQ0EseUJBQVMsV0FBVCxDQUFxQixJQUFyQixFQUEyQixtQkFBM0IsQ0FBK0MsYUFBL0MsRUFBOEQsS0FBSyxXQUFuRTtBQUNIO0FBN0ZMO0FBQUE7QUFBQSxzQ0ErRmMsQ0EvRmQsRUErRmdCOztBQUVYO0FBakdMO0FBQUE7QUFBQSx3Q0FtR2dCLENBbkdoQixFQW1Ha0I7QUFDVixxQkFBSyxRQUFMLEdBQWdCLEVBQUUsTUFBRixDQUFTLFFBQXpCO0FBQ0EscUJBQUssY0FBTCxHQUFzQixFQUFFLE1BQUYsQ0FBUyxjQUEvQjtBQUNBLHdCQUFRLEdBQVIsQ0FBWSx5QkFBWjtBQUNBLHdCQUFRLEdBQVIsQ0FBWSxLQUFLLFFBQWpCOztBQUVBLHFCQUFLLFdBQUw7QUFDSDs7Ozs7QUExR0w7QUFBQTtBQUFBLHFDQThHWTs7QUFFSix1QkFBUTtBQUFBO29CQUFBLEVBQUssV0FBWSxPQUFqQjtvQkFDSixvQkFBQyxNQUFELElBQVEsU0FBUSxjQUFoQixFQUErQixRQUFVLEtBQUssTUFBOUMsR0FESTtvQkFFSixvQkFBQyxPQUFELElBQVMsU0FBUSxnQkFBakIsR0FGSTtvQkFHSixvQkFBQyxVQUFELElBQVksU0FBUyxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQXJCLEVBQTBDLFFBQVUsQ0FBcEQsRUFBdUQsUUFBVSxLQUFLLE1BQXRFLEVBQThFLFVBQVUsS0FBSyxRQUE3RixHQUhJO29CQUlKLG9CQUFDLE9BQUQsSUFBUyxTQUFRLFNBQWpCLEdBSkk7b0JBS0osb0JBQUMsVUFBRCxJQUFZLFNBQVMsS0FBSyxJQUFMLENBQVUsU0FBVixDQUFyQixFQUEyQyxRQUFVLENBQXJELEVBQXdELFFBQVUsS0FBSyxNQUF2RSxFQUErRSxVQUFVLEtBQUssUUFBOUY7QUFMSSxpQkFBUjtBQU9IO0FBdkhMOztBQUFBO0FBQUEsTUFBMkIsTUFBTSxTQUFqQztBQXlISCxDQWpJRCIsImZpbGUiOiJjbGllbnQvY29tcG9uZW50cy9GcmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIFxyXG5kZWZpbmUoWydyZWFjdCcsJ3JlYWN0LWRvbScsJ2NvbXBvbmVudHMvQWN0aW9uTGlzdCcsJ2NvbXBvbmVudHMvSGVhZGVyJywnY29tcG9uZW50cy9IZWFkaW5nJywnc29ja2V0LWlvJ10sIGZ1bmN0aW9uKFJlYWN0LFJlYWN0RE9NLEFjdGlvbkxpc3QsSGVhZGVyLEhlYWRpbmcsaW8pIHtcclxuXHJcbiAgICAvLyBUaGlzIGZyYW1lIHJlcHJlc2VudHMgdGhlIG1haW4gXHJcbiAgICAvLyBjb21wb25lbnQgb2YgdGhlIGFwcCAtIHRoZSBmcmFtZSB0aGF0IHJlbmRlcnMgdGhlIGJhY2tsb2cgYW5kIHNwcmludCBpdGVtc1xyXG4gICAgLy8gU1RBVEUgXHJcbiAgICAvLyAqIFRoaXMgY29tcG9uZW50IGhvbGRzIHRoZSBzdGF0ZSBvZiB0aGUgYmFja2xvZyBhbmQgc3ByaW50IGxpc3RzXHJcbiAgICAvLyAqIGFsbG93aW5nIHlvdSB0byBkcmFnIGJldHdlZW4gbGlzdHMgZWFzaWx5IGJ5IGtlZXBpbmcgdHJhY2sgb2YgYm90aC5cclxuICAgIC8vIFBST1BTXHJcbiAgICByZXR1cm4gY2xhc3MgRnJhbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjgwJyk7IC8vIGlvIGlzIGltcG9ydGVkIGluIGluZGV4Lmh0bWwgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0l0ZW1FdmVudCA9IG51bGxcclxuICAgICAgICAgICAgdGhpcy5kcmFnSXRlbU9iaiA9IG51bGxcclxuICAgICAgICAgICAgaWYoICF0aGlzLnNvY2tldCApe1xyXG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IFwiQ291bGQgbm90IGluaXRpYWxpemUgc29ja2V0XCJcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQdWxsIHRoZSBnb29nbGUgY2FsZW5kZXIgaXRlbSdzIGZyb20gdGhlIHNlcnZlciwgcHJvY2VzcyB0aGVtIGFuZCB1c2UgdGhlbSBhcyBvdXIgc3RhdGUgKCB0ZXN0IGRhdGEgZm9yIG5vdyApXHJcbiAgICAgICAgLy8gU3RhdGUgc2hvdWxkIGJlIG9mIHRoZSBmb2xsb3dpbmcgZm9ybVxyXG4gICAgICAgICAgICAvLyB7IFwiYmFja2xvZ1wiIDogW1xyXG4gICAgICAgICAgICAvLyAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIFwiY29udGVudFwiOiBcImhhdmUgYSBncmVhdCBsaWZlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcImRhdGFJZFwiOiAwLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgXCJyYW5rXCI6IDFcclxuICAgICAgICAgICAgLy8gICAgICB9LCAuLi5cclxuICAgICAgICAgICAgLy8gICAgXSxcclxuICAgICAgICAgICAgLy8gIFwic3ByaW50XCIgOiBbXHJcbiAgICAgICAgICAgIC8vICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgIFwiY29udGVudFwiOiBcIkxvdmUgRXZlcnlvbmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgXCJkYXRhSWRcIjogMixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgXCJyYW5rXCI6IDFcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sIC4uLlxyXG4gICAgICAgICAgICAvLyAgICAgIF1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gRXZlcnkgbGlzdCBvZiBnb29nbGUgY2FsIHRhc2tzIHNob3VsZCBoYXZlIHVuaXF1ZSByYW5rIHdpdGhpbiB0aGF0IGxpc3RcclxuICAgICAgICAvLyBidXQgZXZlcnkgc2luZ2xlIHRhc2sgbXVzdCBoYXZlIGEgdW5pcXVlIGRhdGFJRCBcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0geyBcImJhY2tsb2dcIiA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiaGF2ZSBhIGdyZWF0IGxpZmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YUlkXCI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhbmtcIjogMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogXCJoYXZlIGZ1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhSWRcIjogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmFua1wiOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcImVhdCBicmVhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhSWRcIjogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmFua1wiOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcInBsYXkgZ2FtZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YUlkXCI6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJhbmtcIjogNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogXCJiZSBoYXBweVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhSWRcIjogNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmFua1wiOiA1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcHJpbnRcIiA6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiRG8gdGhpbmdzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFJZFwiOiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyYW5rXCI6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiZ2V0IG1vbmV5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGFJZFwiOiA2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyYW5rXCI6IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ICBcclxuXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICAgICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcykuYWRkRXZlbnRMaXN0ZW5lcihcIml0ZW1MZWF2ZVwiLCB0aGlzLml0ZW1MZWF2ZSk7XHJcbiAgICAgICAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLmFkZEV2ZW50TGlzdGVuZXIoXCJpdGVtRHJhZ2dlZFwiLCB0aGlzLml0ZW1EcmFnZ2VkKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uKCdldmVudHNVcGRhdGVkJywgZnVuY3Rpb24gdXBkYXRlRXZlbnRzKGNvbnRlbnQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvY2Vzc2luZyByZWNpZXZlZCBldmVudHMuLi4nKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5kYXRhWydzcHJpbnQnXSA9IGNvbnRlbnRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uKCdldmVudERlbGV0ZWQnLCBmdW5jdGlvbiB1cGRhdGVFdmVudHMoY29udGVudCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzaW5nIHJlY2lldmVkIGV2ZW50cy4uLicpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmRhdGFbJ3NwcmludCddID0gY29udGVudFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5zb2NrZXQuZW1pdCgnZ2V0U3ByaW50SXRlbXMnKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJpdGVtTGVhdmVcIiwgdGhpcy5pdGVtTGVhdmUpO1xyXG4gICAgICAgICAgICBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKS5yZW1vdmVFdmVudExpc3RlbmVyKFwiaXRlbURyYWdnZWRcIiwgdGhpcy5pdGVtRHJhZ2dlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdGVtTGVhdmUoZSl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdJdGVtIGxlZnQgbGlzdCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpdGVtRHJhZ2dlZChlKXtcclxuICAgICAgICAgICAgdGhpcy5kcmFnSXRlbSA9IGUuZGV0YWlsLmRyYWdJdGVtXHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0l0ZW1MaXN0SWQgPSBlLmRldGFpbC5kcmFnSXRlbUxpc3RJZFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY3VycmVudCBkcmFnZ2VkIGl0ZW0gPSAnKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRyYWdJdGVtKVxyXG4gICAgICAgICAgICAvLyByZXF1aXJlIHRvIHJlZnJlc2ggdGhlIHByb3BzIG9mIHRoZSBhY3Rpb25MaXN0XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVuZGVycyB0aGUgZnJhbWUgZm9yIHRoZSBiYWNrbG9nIGFuZCBhY3Rpb24gaXRlbXMgdXNpbmcgQWN0aW9uTGlzdHMgYW5kIGhlYWRpbmdzXHJcbiAgICAgICAgLy8gYmluZHMgdGhlIGRyYWdnaW5nIGV2ZW50XHJcbiAgICAgICAgcmVuZGVyKCl7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lID0gXCJmcmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgPEhlYWRlciBjb250ZW50PVwiSW5maW5pU3ByaW50XCIgc29ja2V0ID0ge3RoaXMuc29ja2V0fS8+XHJcbiAgICAgICAgICAgICAgICA8SGVhZGluZyBjb250ZW50PVwiQ3VycmVudCBTcHJpbnRcIi8+XHJcbiAgICAgICAgICAgICAgICA8QWN0aW9uTGlzdCBhY3Rpb25zPXt0aGlzLmRhdGFbJ3NwcmludCddfSBkYXRhSWQgPSB7MH0gc29ja2V0ID0ge3RoaXMuc29ja2V0fSBkcmFnSXRlbT17dGhpcy5kcmFnSXRlbX0gLz5cclxuICAgICAgICAgICAgICAgIDxIZWFkaW5nIGNvbnRlbnQ9XCJCYWNrbG9nXCIvPlxyXG4gICAgICAgICAgICAgICAgPEFjdGlvbkxpc3QgYWN0aW9ucz17dGhpcy5kYXRhWydiYWNrbG9nJ119IGRhdGFJZCA9IHsxfSBzb2NrZXQgPSB7dGhpcy5zb2NrZXR9IGRyYWdJdGVtPXt0aGlzLmRyYWdJdGVtfS8+XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
