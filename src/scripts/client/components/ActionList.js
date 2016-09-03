

define(['react', 
'react_dom', 
'jquery',
'jquery-ui', 
'google_api', 
'browser_request', 
'api',
'components/BaseComponent', 
'components/Action',
'components/Spinner',
'components/simple/RefreshIcon',
'components/Heading'], function (React, ReactDOM, $, jqueryUi, googleApi, request, api, BaseComponent, Action, Spinner, RefreshIcon, Heading) {

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

            this.state = {
                error: null,
                actions: null
            }
        }

      

        deleteAction(action) {
            // this.props.socket.emit('deleteEvent', { 'event': action });
        }

        componentWillMount(){
            
           Promise.all([
               this.refreshData() 
            ]).then( (results) => {
                results.forEach( (result) => {
                    console.info(result)
                })

            })

        }

        refreshData(){
            return new Promise((resolve, reject) => {
                this.googleEventUpdates().then( (events) => {
                    this.setState( { actions : events } )

                    resolve(`Data for action list with title "${this.props.title}" successfully refreshed`)
                }).catch( (err) => {
                    this.setState({
                        error : err 
                    })

                    resolve(`Error occured while refreshing data for action list with title "${this.props.title}"`)
                })
            });
        }
        

        googleEventUpdates(){
            return new Promise((resolve, reject) => {
                googleApi.getEvents(this.props.date).then( (events) => {

                    var eventOps = []

                    for(var i =0; i< events.length; i++){
                        var curEv = events[i]

                        eventOps.push( this.syncEvent(curEv) )
                    }

                    return Promise.all( eventOps )

                }).then( (events) => {
                    resolve(events)
                }).catch( (err) => {
                    reject(err)
                }) 
            });
        }


        syncEvent(event){
            return new Promise((resolve, reject) => {
                 var getUrl = `/event/${googleApi.calId}/${event.id}` 
                 request.get(getUrl, (err,res,body) => {
                    Promise.resolve().then( () => {
                        // misc error occured
                        if(err) return Promise.reject(err)
                        if( res.status !== 200){
                            // did not recieve any event data
                            if( res.status === 404){
                                // event doesn't exist yet
                                // create the event
                                // rank should be created on the server according to it's date.
                                return api.createEvent(googleApi.calId, event)
                            } else {
                                // reject the unknown response
                                var err = new Error(`Unknown request response encountered\n
                                                    Request eventId:${event.id}, calId:${googleApi.calId}\n
                                                    Request url: ${getUrl}`)
                                return Promise.reject(err)
                            }
                            
                            
                        } else {
                            // retrieve the returned event
                            var remoteEvent = JSON.parse(body);

                            // give the new event the properties to be perserved, indicated by the props parameter
                            ;(function augmentProps(event, augmentedEvent, props){
                                props.forEach( (prop) => {
                                    event[prop] = augmentedEvent[prop]
                                })
                            })(event, remoteEvent, ['rank'])

                            // update the event, assume it has changed
                            // if the date has been changed, the rank will automatically be updated
                            return api.updateEvent(googleApi.calId, event)

                        }

                    }).then( (updatedEvent) => {
                        resolve(updatedEvent)
                    }).catch( (err) => {
                        reject(err)
                    })

                })
            });
        }

        

        render() {

            // content to be rendered
            var content = null;

            if( this.state.error !== null ){
                content = React.createElement('p', { className: 'errText'}, `Error: ${this.state.error.message}` )
            } else if( this.state.actions == null ){
                // initial data retrieval has not been performed
                content = React.createElement(Spinner, { message: 'Loading action data...' } )
            } else if( this.state.actions.length == 0) {
                // Placeholder message if no actions are present in the object
                content = React.createElement('p', { className: 'plainText' }, 'You have nothing to do .... ');
                
            } else {
                // render the states action items

                // Sorts the given list of action items by rank ascending order vertically
                var sortedActions = this.state.actions.sort(function (one, two) {
                    return one.rank - two.rank;
                });

                // maps each action in the object to a Action component to render
                // passing down the dataId property for drag event handling
                content = sortedActions.map(function (action) {
                    return React.createElement(Action, { key: action.id, dataId: action.id ,content: action.summary, rank: action.rank });
                });
            }


            return React.createElement('div',null,
                React.createElement(Heading,{ content: this.props.title }),
                // renders an actionList using the action items giving with a unique dataID to distuinguish it in it's parent container
                React.createElement('div', {
                                    className: 'actionList',
                                    date : this.props.date,
                                    "ref": function(el){
                                        if( el !== null){
                                            // remove the spinner if it exists
                                            $(el).sortable({
                                                connectWith: '.actionList',
                                                items: "> .action"
                                            })
                                        }
                                    }
                                }, 
                                React.createElement(RefreshIcon, { task: this.refreshData.bind(this) } ), 
                                content
                            )
            )

        }
    };
});