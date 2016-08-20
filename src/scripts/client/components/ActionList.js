

define(['react', 
'react_dom', 
'google_api', 
'browser_request', 
'api',
'components/BaseComponent', 
'components/Action',
'components/Spinner'], function (React, ReactDOM, googleApi, request, api, BaseComponent, Action, Spinner) {

    // This component renders a list from object containing a array of action items
    // STATELESS
    // PROPS
    // * actions
    // 		an object of action items
    // { "items" : [
    //                       {
    //                         "content": "have a great life",
    //                         "dataId": 0,
    //                         "rank": 1
    //                       }, ...
    //                     ]
    // * dataID
    // 		unique ID    
    return class ActionList extends React.Component {

        constructor(props) {
            super(props);

            this.swapActionItems = this.swapActionItems.bind(this);
            this.onDragEnd = this.onDragEnd.bind(this);
            this.onDragStart = this.onDragStart.bind(this);
            this.onDragEnter = this.onDragEnter.bind(this);
            this.onDragLeave = this.onDragLeave.bind(this);
            this.deleteAction = this.deleteAction.bind(this);

            this.curDraggedItem = null;
        }

        /**
         * @param  {any} dropItem The element that represents the item
         *                        the dragItem was dropped on 
         */
        swapActionItems(dropTargetItem){
  
            var dragItemObj = this.curDraggedItem;

            var dropTargetItemObj = {};
            this.state['actions'].forEach(function (obj) {
                if (dropTargetItem.getAttribute('data-id') === obj['id']) {
                    dropTargetItemObj = obj;
                }
            });
        }

        // prevent default behaviour and tell the actionList that nothing is being dragged
        onDragEnd(e) {
            e.preventDefault();
            this.curDraggedItem = null;
            e.stopPropagation();
        }

        // Tells the frame what object is being dragged to handle the drop later
        onDragStart(e) {
            // console.log(class)
            // console.log("drag started")
            // console.log(e.target.getAttribute('data-id'))
            //  
            
            this.state['actions'].forEach((obj) => {
                console.log(obj);
                if (e.target.getAttribute('data-id') === obj['id']) {
                    this.curDraggedItem = obj;
                }
            });

            e.stopPropagation();
        }

        // When a object is dragged over another valid object
        onDragEnter(e) {

            // local variable to complement the this.props.dragItem
            var dropTargetItem = e.target;
            // console.log("dragged over : " + dropTargetItem)
            // console.log("currently dragged : " + this.props.dragItem)

            // console.log(" --- drop item = " + dropTargetItem + " --- drag item = " + this.props.dragItem)
            // Ensure that the user is dragging two valid objects
            if (dropTargetItem != null && this.curDraggedItem != null) {

                // Get the class of both items
                var dropTargetItemClass = dropTargetItem.getAttribute('class').toString();
                // console.log("drop item class = " + dropTargetItemClass)

                // filter action items ( exclude actionLists )
                var actionRegex = new RegExp("( |^)action( |$)");

                // both action classes
                if (actionRegex.exec(dropTargetItemClass) != null) {
                    // console.log('both action classes')
                    // have unique id's
                    if (dropTargetItem.getAttribute('data-id') != this.curDraggedItem['id']) {
                        console.log('dragged over valid drop target');
                        // console.log('have unique ids')
                        // swap the action itmes
                        this.swapActionItems(dropTargetItem);
                    }
                }
                // Oppurtunity here to implement drag with other types of objects
            }

            // Prevent the browsers default drag and drop behaviour from occuring
            if (e.preventDefault) {
                e.preventDefault();
            }

            e.stopPropagation();
        }

        onDragLeave(e) {

            // actionList is a class of the target
            // console.log(e.target)
            if (e.target.getAttribute('class').indexOf('actionList') > -1) {
                console.log('left valid drag target');
                // console.log(e.target.getAttribute('class'));
                // console.log('dispatching drag leave event')
            }
            e.stopPropagation();

            this.deleteAction(e.target);
        }

        deleteAction(action) {
            // this.props.socket.emit('deleteEvent', { 'event': action });
        }

        componentWillMount(){

            this.googleEventUpdates().then( (events) => {
                this.setState( { actions : events } )
            })

        }

        googleEventUpdates(){
            return new Promise((resolve, reject) => {
                googleApi.getEvents(this.props.date).then( (events) => {

                    var eventOps = []

                    for(var i =0; i< events.length; i++){
                        var curEv = events[i]

                        eventOps.push( this.syncEvent(curEv) )
                    }

                    Promise.all( eventOps ).then( (events) => {
                        resolve(events)
                    })

                }) 
            });
        }


        syncEvent(event){
            return new Promise((resolve, reject) => {
                 var getUrl = `/event/${googleApi.calId}/${event.id}` 
                 request.get(getUrl, (err,res,body) => {
                        if(err) throw err

                        
                        if( res.status !== 200){
                            // did not recieve any event data
                            if( res.status === 404){
                                // event doesn't exist yet
                                // create the event
                                api.createEvent(googleApi.calId, event).then( (remoteEvent) => {
                                    // rank should have been created on the server according to it's date.
                                    resolve(remoteEvent)
                                }, (err) => {
                                    reject(err)
                                })
                            } else {
                                var err = new Error(`Unknown request response encountered\n
                                                    Request eventId:${event.id}, calId:${googleApi.calId}\n
                                                    Request url: ${getUrl}`)
                                throw err
                            }
                            
                            
                        } else {
                            // retrieve the returned event
                            var remoteEvent = JSON.parse(body);


                            // assume the event needs updating
                            // optimize to check equality and only update when neccesary later

                            if( remoteEvent.start.dateTime != event.start.dateTime){
                                // dates changed, which means the remote rank is not reliable. 
                                // Create a whole new event, overwriting the old one, and getting a new rank
                                api.createEvent(googleApi.calId, event).then( (remoteEvent) => {
                                    // rank should have been created on the server according to it's date.
                                    resolve(remoteEvent)
                                }, (err) => {
                                    reject(err)
                                })
                            } else  {
                                // date hasn't changed, rank is still reliable
                                // can't trust anything else is equal, so update.

                                // give the new event the props to be preserved ( in this case, only rank)
                                event.rank = remoteEvent.rank

                                api.updateEvent(googleApi.calId,event).then( (remoteEvent) => {

                                    resolve(remoteEvent)
                                }, (err) => {
                                    reject(err)
                                })

                            }


                            // use the rank to sort the object
                        }

                        

                        // console.debug(body)
                    })
            });
        }

        

        render() {

            // content to be rendered
            var content = null;
            // placeholder for actual action items
            var actionElems = null;

            // initial date retrieval has not been performed
            if( this.state == null || this.state.actions == null || this.state.actions == undefined ){
                content = React.createElement(Spinner, { message: 'Loading action data...' } )
            } else if( this.state.actions.length == 0) {
                // Placeholder message if no actions are present in the object
                actionElems = React.createElement('p', { className: 'plainText' }, 'You have nothing to do .... ');
                
            } else {

                // Sorts the given list of action items by rank ascending order vertically
                var sortedActions = this.state.actions.sort(function (one, two) {
                    return one.rank - two.rank;
                });

                // maps each action in the object to a Action component to render
                // passing down the dataId property for drag event handling
                actionElems = sortedActions.map(function (action) {
                    return React.createElement(Action, { key: action.id, dataId: action.id ,content: action.summary, rank: action.rank });
                });
            }

            if( content == null){
                // no placeholder for action items has been created
                content = actionElems
            }

            // renders an actionList using the action items giving with a unique dataID to distuinguish it in it's parent container
            return React.createElement('div', { className: 'actionList',
                                                date : this.props.date,
                                                onDragStart: this.onDragStart,
                                                onDragEnter: this.onDragEnter,
                                                onDragEnd: this.onDragEnd,
                                                onDragLeave: this.onDragLeave },
                                        content
                                    );
        }
    };
});