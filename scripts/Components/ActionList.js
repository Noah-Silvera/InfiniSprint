import '../../styles/styles.css'
import React, {Component} from 'react';
import Action from './Action'


 
export default class ActionList extends Component {

	constructor(props) {
		super(props)
		this.state = { "actions": this.props.actions }
	}


	render() {
	// this maps every action in the actions array to a action element
	var actionElems = this.state["actions"].map( function(action) {
		return (
			<Action key = {action.key} content={action.content} rank = {action.rank}/>
		);	
	});

	// Placeholder message if no actions
	if ( actionElems.length == 0 ) {
		actionElems = ( <p className = "plainText" >You have nothing to do .... </p> );
	}

	return (
			<div className = "actionList">
					{actionElems}
			</div>
					 			)
	}
}