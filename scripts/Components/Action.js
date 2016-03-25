'use strict'
import '../../styles/styles.css'
import React, {Component} from 'react';


// STATELESS
// this class renders an action item from google calender
// When dragged over a valid drop target, it emits an onDragOverEvent
export default class Action extends Component {

	render() {
		console.log(this.props.rank)	
		return (
				<div className = "action" draggable = "true" onDragOver = {this.onDragOver.bind(this, this.props)}>
						<p className = "row">{this.props.rank} -- </p><p className = "row">{this.props.content}</p>
				</div>
			)

	}

	onDragOver = (e) => {
		// console.log("dragged over" + e.target.innerH	TML);
		console.log("props = " + this.props.content.toString())
		for( var p in this.props ) {
			console.log( p.toString() )
		}


		// Prevents a browsers default behaviour ( like navigating to a link )
		if (e.preventDefault) {
	    e.preventDefault();
	  }

	  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

	  return false;
	}
}