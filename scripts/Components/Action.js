import '../../styles/styles.css'
import React, {Component} from 'react';


export default class Action extends Component {

	render() {
		console.log(this.props.rank)
		return (
				<p className = "action" draggable = "true" onDragOver = {this.onDragOver}>
						{this.props.content}
				</p>
			)

	}

	onDragOver = (e) => {
		console.log("dragged over a valid drop target");

		// Prevents a browsers default behaviour ( like navigating to a link )
		if (e.preventDefault) {
	    e.preventDefault();
	  }

	  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

	  return false;
	}
}