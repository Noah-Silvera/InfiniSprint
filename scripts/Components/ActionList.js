import '../../styles/styles.css'
import React, {Component} from 'react';
import Action from './Action'

export default class ActionList extends Component {
	

	onDragExit = (e) => {
		e.stopPropagation()
		console.log('drag ended')
		console.log(e.target)
	}

	onDragLeave = (e) => {
		e.stopPropagation()
		console.log('drag left')
		console.log(e.target)
	}

	onDragStart = (e) => {
		e.stopPropagation()
		console.log('drag started')
		console.log(e.target)
	}

	render = () => {
	// this maps every action in the actions array to a action element
	var actionElems = this.props.actions.map( function(action) {
		return (
			<div className = "invisibleFrame" key= {action.key} draggable = "false">
				<Action content={action.content}/>
			</div>
		);
	});

	// Placeholder message if no actions
	if ( actionElems.length == 0 ) {
		actionElems = ( <p className = "plainText" >You have nothing to do .... </p> );
	}

	return (
			<div className = "actionList" 
				draggable = "false" 
				onDragStart = {this.onDragStart}
				onDragExit = {this.onDragExit} >
				{actionElems}
			</div>
		)
	}
}