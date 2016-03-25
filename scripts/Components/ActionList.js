import '../../styles/styles.css'
import React, {Component} from 'react';
import Action from './Action'


 
export default class ActionList extends Component {

	constructor(props) {
		super(props)
	}


	render() {
	// this maps every action in the actions array to a action element
	// 
	var sortedActions = this.props.actions.sort( function( one,two ) {
		return ( one.dataId - two.dataId )
	});
	var actionElems = sortedActions.map( function(action) {
		return (
			<Action key = {action.dataId} dataId = {action.dataId} content={action.content}  rank = {action.rank}/>
		);	
	});

	// Placeholder message if no actions
	if ( actionElems.length == 0 ) {
		actionElems = ( <p className = "plainText" >You have nothing to do .... </p> );
	}

	return (
			<div className = "actionList" data-id = {this.props.dataId} >
					{actionElems}
			</div>
					 			)
	}
}