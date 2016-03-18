import '../../styles/styles.css'
import React, {Component} from 'react';


export default class Action extends Component {

	render = () => {
		return (
				<div className = "action"
					draggable = "true" 
					>{this.props.content}</div>
			)


	}
}