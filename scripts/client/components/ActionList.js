"use strict";
import './../../../styles/styles.css'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Action from './Action'


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
export default class ActionList extends Component {

	constructor(props) {
		super(props)
    // initial state 
    // take the initial list given to the ActionList
    this.state = { 'actions' : this.props.actions }
	}


  // assumes the items are both in a ActionList
  // NOT SWAPPING RANK SWAPPING ID'S DOING IT WRONG
  swapActionItems = (dropItem) => {
    // console.log(dragItem.parentNode.getAttribute('class') + " - " + dragItem.parentNode.getAttribute('data-id'))
    var newState = this.state
    var dragItem = this.props.dragItem

    var dragRank = ActionList.getPropByDataId(newState['actions'],'rank',dragItem.getAttribute('data-id'))
    var dropRank = ActionList.getPropByDataId(newState['actions'],'rank',dropItem.getAttribute('data-id'))

    ActionList.setPropByDataId(newState['actions'],'rank',dropRank, dragItem.getAttribute('data-id') )
    ActionList.setPropByDataId(newState['actions'],'rank', dragRank, dropItem.getAttribute('data-id') )

    this.setState( newState )
    // console.log("new state"  )
    console.log(this.state  )
    
  	console.log('dispatching drag item update events')
  	this.props.socket.emit('updateEvent', { 'event': dragItem } )
  	this.props.socket.emit('updateEvent', { 'event': dropItem } )

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
  onDragEnd = (e) => {
    e.preventDefault()
	  ReactDOM.findDOMNode(this).dispatchEvent( new CustomEvent('itemDragged', { 'detail': {
	   																																						'dragItem' : null 
	   																																					} ,
																																							'bubbles' : true,
																																							'cancelable' :true
																																						}) 
	  																				)
    e.stopPropagation()
  }

  // Tells the frame what object is being dragged to handle the drop later
  onDragStart = (e) => {
    // console.log(class)
    // console.log("drag started")
    // console.log(e.target.getAttribute('data-id'))
	  ReactDOM.findDOMNode(this).dispatchEvent( new CustomEvent('itemDragged', { 'detail': {
	  																																						 'dragItem' : e.target 
	  																																						},
	  																																						'bubbles' : true,
																																								'cancelable' :true
	  																																					}) 
	  																				)
    e.stopPropagation()
  }

  // When a object is dragged over another valid object
  onDragEnter = (e) => {

    // local variable to complement the this.props.dragItem
    var dropItem = e.target
    // console.log("dragged over : " + dropItem)
    // console.log("currently dragged : " + this.props.dragItem)

    // console.log(" --- drop item = " + dropItem + " --- drag item = " + this.props.dragItem)
    // Ensure that the user is dragging two valid objects
    if( dropItem != null && this.props.dragItem != null) {

      // Get the class of both items
      var dropItemClass = dropItem.getAttribute('class').toString()
      var dragItemClass = this.props.dragItem.getAttribute('class').toString()
      console.log("drop item class = " + dropItemClass)
      console.log("drag item class = " + dragItemClass)

      // filter action items ( exclude actionLists )
      var actionRegex = new RegExp("( |^)action( |$)")

      // both action classes
      if ( actionRegex.exec(dropItemClass) != null && actionRegex.exec(dragItemClass) != null ){
        // console.log('both action classes')
        // have unique id's
        if( dropItem.getAttribute('data-id') != this.props.dragItem.getAttribute('data-id')){
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

  onDragLeave = (e) => {

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
	  																														 },
	  																														)
	  																					)
			this.props.socket.emit('deleteEvent', { 'event' : e.target })
  	}
  	e.stopPropagation()
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
				)
	}
}