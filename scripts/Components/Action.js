'use strict'
import '../../styles/styles.css'
import React, {Component} from 'react';


// STATELESS
// this class renders an action item from google calender
// When dragged over a valid drop target, it emits an onDragEnterEvent
export default class Action extends Component {

	render() {
		return (
				<div className = "action" draggable = "true" data-id = {this.props.dataId} >
						<p className = "row">{this.props.rank} -- </p><p className = "row">{this.props.content}</p>
				</div>
			)

	}
}