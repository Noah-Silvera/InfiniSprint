
  
define(['react','react-dom','components/ActionList','components/Header','components/Heading','socket-io'], function(React,ReactDOM,ActionList,Header,Heading,io) {

    // This frame represents the main 
    // component of the app - the frame that renders the backlog and sprint items
    // STATE 
    // * This component holds the state of the backlog and sprint lists
    // * allowing you to drag between lists easily by keeping track of both.
    // PROPS
    return class Frame extends React.Component {
        constructor(props){
            super(props);
            this.socket = io('http://localhost:80'); // io is imported in index.html    
            this.dragItemEvent = null
            this.dragItemObj = null
            if( !this.socket ){
                var msg = "Could not initialize socket"
                console.error(msg)
                throw new Error(msg)
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
            this.data = { "backlog" : [
                        {
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
                        }
                        ],
                        "sprint" : [
                        {
                            "content": "Do things",
                            "dataId": 5,
                            "rank": 1
                        }, {
                            "content": "get money",
                            "dataId": 6,
                            "rank": 2
                        }
                        ]
                    }

        }  

        componentDidMount(){
            ReactDOM.findDOMNode(this).addEventListener("itemLeave", this.itemLeave);
            ReactDOM.findDOMNode(this).addEventListener("itemDragged", this.itemDragged);

            this.socket.on('eventsUpdated', function updateEvents(content){
            console.log('processing recieved events...')
            console.log(content)
                // this.data['sprint'] = content
            })
            
            this.socket.on('eventDeleted', function updateEvents(content){
            console.log('processing recieved events...')
            console.log(content)
                // this.data['sprint'] = content
            })

            // this.socket.emit('getSprintItems')

        }

        componentWillUnmount(){
            ReactDOM.findDOMNode(this).removeEventListener("itemLeave", this.itemLeave);
            ReactDOM.findDOMNode(this).removeEventListener("itemDragged", this.itemDragged);
        }

        itemLeave(e){
            // console.log('Item left list')
        }

        itemDragged(e){
            this.dragItem = e.detail.dragItem
            this.dragItemListId = e.detail.dragItemListId
            console.log('current dragged item = ')
            console.log(this.dragItem)
            // require to refresh the props of the actionList
            this.forceUpdate()
        }

        // Renders the frame for the backlog and action items using ActionLists and headings
        // binds the dragging event
        render(){

            return (<div className = "frame">
                <Header content="InfiniSprint" socket = {this.socket}/>
                <Heading content="Current Sprint"/>
                <ActionList actions={this.data['sprint']} dataId = {0} socket = {this.socket} dragItem={this.dragItem} />
                <Heading content="Backlog"/>
                <ActionList actions={this.data['backlog']} dataId = {1} socket = {this.socket} dragItem={this.dragItem}/>
            </div>);
        }
    }
})