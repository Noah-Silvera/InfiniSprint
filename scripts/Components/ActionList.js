"use strict";
import '../../styles/styles.css'
import React, {Component} from 'react';
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

			<div className = "actionList" data-id = {this.props.dataId} >
					{actionElems}
			</div>
			)
	}
}