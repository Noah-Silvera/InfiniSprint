import '../../styles/styles.css'
import React, {Component} from 'react';


export default class Action extends Component {
	render() {
		// JSX inside here
		return (
				<p className = "action">{this.props.content}</p>
			)
	}
}