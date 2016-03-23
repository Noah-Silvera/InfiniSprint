import '../../styles/styles.css'
import React, {Component} from 'react';


export default class Action extends Component {

	render = () => {
		return (
				<p className = "action" 
					draggable = "true" 
					onDragStart = {this.onDragStart}
					onDragOver = {this.onDragOver}
					onDragEnter = {this.onDragEnter}
					onDragLeave = {this.onDragLeave}
					onDrop = {this.onDrop}
					onDragEnd = {this.onDragEnd}>
						{this.props.content}
				</p>
			)


	}

	onDragStart = (e) => {
		console.log("Drag Started")
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

	// Refactor for react state
	onDragEnter = (e) => {
		console.log("entered a valid target")
	  // this / e.target is the current hover target.
	  this.classList.add('over');
	}

	// Refactor for react state
	onDragLeave = (e) => {
		console.log("left a valid target")
  	this.classList.remove('over');  // this / e.target is previous target element.
	}

	onDrop = (e) => {
	  // this / e.target is current target element.

	  if (e.stopPropagation) {
	    e.stopPropagation(); // stops the browser from redirecting.
	  }

	  // See the section on the DataTransfer object.

	  return false;
	}
	onDragEnd = (e) => {
	  // this/e.target is the source node.

	  [].forEach.call(cols, function (col) {
	    col.classList.remove('over');
	  });
	}
}