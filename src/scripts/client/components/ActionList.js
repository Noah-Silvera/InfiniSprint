

define(['react', 
'react_dom', 
'jquery',
'jquery-ui', 
'google_api', 
'browser_request', 
'api',
'components/BaseComponent', 
'components/Action',
'components/Spinner'], function (React, ReactDOM, $, jqueryUi, googleApi, request, api, BaseComponent, Action, Spinner) {

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

            this.deleteAction = this.deleteAction.bind(this);

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
            return React.createElement('div', {
                    className: 'actionList',
                    date : this.props.date,
                    "ref": function(el){
                        if( el !== null){
                            // remove the spinner if it exists
                            $(el).sortable({
                                connectWith: '.actionList'
                            })
                        }
                    }
                }, content
            );
        }
    };
});