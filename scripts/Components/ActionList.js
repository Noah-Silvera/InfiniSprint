import '../../styles/styles.css'
import React, {Component} from 'react';
import Action from './Action'

export default class ActionList extends Component {
	render() {
		// JSX inside here
		return (
				<div className = "actionList" >
					<Action />
					<Action />
					<Action />
					<Action />
					<Action />
				</div>
			)
	}
}