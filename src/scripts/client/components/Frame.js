

define(['react', 'react_dom', 'components/ActionList', 'components/Header', 'components/Heading','socket'], function (React, ReactDOM, ActionList, Header, Heading, socket) {

    // This frame represents the main
    // component of the app - the frame that renders the backlog and sprint items
    // STATE
    // * This component holds the state of the backlog and sprint lists
    // * allowing you to drag between lists easily by keeping track of both.
    // PROPS
    return class Frame extends React.Component {
        constructor(props) {
            super(props);
            this.dragItemEvent = null;
            this.dragItemObj = null;

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
            this.data = { "backlog": [{
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
        }

        componentDidMount() {
            ReactDOM.findDOMNode(this).addEventListener("itemLeave", this.itemLeave);
            ReactDOM.findDOMNode(this).addEventListener("itemDragged", this.itemDragged);

            socket.listen.eventsUpdated(function updateEvents(content) {
                console.log('processing recieved events...');
                console.log(content);
                // this.data['sprint'] = content
            });

            socket.listen.eventDeleted(function updateEvents(content) {
                console.log('processing recieved events...');
                console.log(content);
                this.data['sprint'] = content;
            });

            // this.socket.emit('getSprintItems')
        }

        componentWillUnmount() {
            ReactDOM.findDOMNode(this).removeEventListener("itemLeave", this.itemLeave);
            ReactDOM.findDOMNode(this).removeEventListener("itemDragged", this.itemDragged);
        }

        itemLeave(e) {
            // console.log('Item left list')
        }

        itemDragged(e) {
            this.dragItem = e.detail.dragItem;
            this.dragItemListId = e.detail.dragItemListId;
            console.log('current dragged item = ');
            console.log(this.dragItem);
            // require to refresh the props of the actionList
            this.forceUpdate();
        }

        // Renders the frame for the backlog and action items using ActionLists and headings
        // binds the dragging event
        render() {

            return React.createElement('div', { className: 'frame' }, 
                React.createElement(Header, {   content: 'InfiniSprint',
                                                socket: this.socket }), 
                React.createElement(Heading, { content: 'Current Sprint' }), 
                React.createElement(ActionList, {   actions: this.data['sprint'],
                                                    dataId: 0,
                                                    socket: this.socket,
                                                    dragItem: this.dragItem }), 
                React.createElement(Heading, { content: 'Backlog' }), 
                React.createElement(ActionList, {   actions: this.data['backlog'],
                                                    dataId: 1,
                                                    socket: this.socket,
                                                    dragItem: this.dragItem }));
        }
    };
});