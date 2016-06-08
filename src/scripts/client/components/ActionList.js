


define(['react','components/Action'],function(React,Action){
    

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
            super(props)
        // initial state 
        // take the initial list given to the ActionList
            this.state = { 'actions' : this.props.actions }
        }

        /**
         * @param  {any} dropItem The element that represents the item
         *                        the dragItem was dropped on 
         */
        swapActionItems(dropItem){

            var dragItemObj = this.props.dragItem
            var dragItemListId = this.props.dragItemListId

            var dropItemObj = {}
            this.state['actions'].forEach( function(obj){
                if( dropItem.getAttribute('data-id') === obj['dataId']){
                    dropItemObj = obj
                }
            });

            var dropItemListId = this.props.dataId

            var dragRank = ActionList.getPropByDataId(dragItemObj,'rank',dragItemObj['dataId'])
            var dropRank = ActionList.getPropByDataId(dropItemObj,'rank',dropItem.getAttribute('data-id'))

            ActionList.setPropByDataId(dragItemObj,'rank',dropRank, dragItemObj['dataId'] )
            ActionList.setPropByDataId(dropItemObj,'rank', dragRank, dropItem.getAttribute('data-id') )
            
            console.log('dispatching drag item update events')
            this.props.socket.emit('updateEvents', { 'event': dropItemObj, 'list' : dropItemListId } )
            this.props.socket.emit('updateEvents', { 'event': dragItemObj, 'list' : dropItemListId  } )

        }


        // retrieves the prop "prop" of an object using the dataId attribute as a key
        static getPropByDataId (object,prop,dataId) {
            for(var i = 0; i < object.length; i++) {
            if( object[i]["dataId"] == dataId  ) {
                return object[i][prop]
            }
            }
        }


        // sets the prop "prop" of an object to value using  dataID as a key
        static setPropByDataId (object,prop,value, dataId) {
            // console.log("-----------------------------")
            // console.log( "start of setting" + JSON.stringify(object) )
            for(var i = 0; i < object.length; i++) {
            if( object[i]["dataId"] == dataId  ) {
                // console.log("object" + JSON.stringify( object[i] ) )
                // console.log("value" + value)
                // console.log("before change" + JSON.stringify( object[i] ) )
                object[i][prop] = value
                // console.log("after change" + JSON.stringify( object[i] ) )  
            }
            }  
            // console.log( "end of setting" + JSON.stringify(object) )
            // console.log("-----------------------------")
        }

        // prevent default behaviour and tell the actionList that nothing is being dragged
        onDragEnd(e){
            e.preventDefault()
            ReactDOM.findDOMNode(this).dispatchEvent( new CustomEvent('itemDragged', { 'detail': {
                                                                                                                                                                    'dragItem' : null,
                                                                                                                                                                    'dragItemList': null
                                                                                                                                                                } ,
                                                                                                                                                                    'bubbles' : true,
                                                                                                                                                                    'cancelable' :true
                                                                                                                                                                }) 
                                                                                            )
            e.stopPropagation()
        }

        // Tells the frame what object is being dragged to handle the drop later
        onDragStart(e){
            // console.log(class)
            // console.log("drag started")
            // console.log(e.target.getAttribute('data-id'))
            // 
            var dragItemObj = {}
            this.state['actions'].forEach( function(obj){
                console.log(obj)
                if( e.target.getAttribute('data-id') === obj['dataId']){
                    dragItemObj = obj
                }
            });
            ReactDOM.findDOMNode(this).dispatchEvent( new CustomEvent('itemDragged', { 'detail': {
                                                                                                                                                                    'dragItem' : dragItemObj,
                                                                                                                                                                    'dragItemListId' : this.props.dataId
                                                                                                                                                                    },
                                                                                                                                                                    'bubbles' : true,
                                                                                                                                                                        'cancelable' :true
                                                                                                                                                                }) 
                                                                                            )
            e.stopPropagation()
        }

        // When a object is dragged over another valid object
        onDragEnter(e){

            // local variable to complement the this.props.dragItem
            var dropItem = e.target
            // console.log("dragged over : " + dropItem)
            // console.log("currently dragged : " + this.props.dragItem)

            // console.log(" --- drop item = " + dropItem + " --- drag item = " + this.props.dragItem)
            // Ensure that the user is dragging two valid objects
            if( dropItem != null && this.props.dragItem != null) {

            // Get the class of both items
            var dropItemClass = dropItem.getAttribute('class').toString()
            // console.log("drop item class = " + dropItemClass)

            // filter action items ( exclude actionLists )
            var actionRegex = new RegExp("( |^)action( |$)")

            // both action classes
            if ( actionRegex.exec(dropItemClass) != null ){
                // console.log('both action classes')
                // have unique id's
                if( dropItem.getAttribute('data-id') != this.props.dragItem['dataId'] ){
                        console.log('dragged over valid drop target')
                // console.log('have unique ids')
                // swap the action itmes
                this.swapActionItems(dropItem)
                }
            } 
            // Oppurtunity here to implement drag with other types of objects
            }

            // Prevent the browsers default drag and drop behaviour from occuring
            if (e.preventDefault) {
            e.preventDefault();
            }

            e.stopPropagation()
        }

        onDragLeave(e){

            // actionList is a class of the target
            // console.log(e.target)
            if(e.target.getAttribute('class').indexOf('actionList') > -1 ){
                console.log('left valid drag target')
                // console.log(e.target.getAttribute('class'));
                // console.log('dispatching drag leave event')
                ReactDOM.findDOMNode(this).dispatchEvent( new CustomEvent('itemLeave',
                                                            { 'detail': this.props.dragItem,
                                                                'bubbles' : true,
                                                                'cancelable':true
                                                            }
                                                        )
                    )
            }
            e.stopPropagation()

            this.deleteAction(e.target)
        }

        deleteAction(action){
                this.props.socket.emit('deleteEvent', { 'event' : action })
        }

        render() {

            // console.log(JSON.stringify(this.props.actions) )
            
            if ( this.props.actions.length == 0 ) {
                // Placeholder message if no actions are present in the object
                actionElems = ( <p className = "plainText" >You have nothing to do .... </p> );
            } else {

                // Sorts the given list of action items by rank ascending order vertically
                var sortedActions = this.props.actions.sort( function( one,two ) {
                    return ( one.rank - two.rank )
                });

                // maps each action in the object to a Action component to render
                // passing down the dataId property for drag event handling
                var actionElems = sortedActions.map( function(action) {
                    return (
                        <Action key = {action.dataId} dataId = {action.dataId} content={action.content}  rank = {action.rank}/>
                    );	
                });

            }

            // renders an actionList using the action items giving with a unique dataID to distuinguish it in it's parent container
            return (

                    <div className = "actionList" data-id = {this.props.dataId} onDragStart = {this.onDragStart} onDragEnter = {this.onDragEnter} onDragEnd = {this.onDragEnd} onDragLeave = {this.onDragLeave} >
                            {actionElems}
                    </div>
                    );
        }
    }
})