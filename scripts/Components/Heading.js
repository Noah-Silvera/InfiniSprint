import '../../styles/styles.css'
import React, {Component} from 'react';


export default class Heading extends Component {
	render = () => {
		return (
				<div className = "heading">
					<h3 className = "title">{this.props.content}</h3>
				</div>
			)
	}
}