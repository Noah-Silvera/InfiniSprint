import '../../styles/styles.css'
import React, {Component} from 'react';
import Action from './Action'

export default class ActionList extends Component {
	render() {
	// this maps every action in the actions array to a action element
	var actionElems = this.props.actions.map( function(action) {
		return (
			<Action key= {action.key} content={action.content}/>
		);
	});
	//  the {} is the equivalent of using a variable in JSX
	return (
			<div className = "actionList" >
				{actionElems}
			</div>
		)
	}
}