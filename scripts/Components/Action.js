"use strict";
import '../../styles/styles.css'
import React, {Component} from 'react';


// this class renders an action item
// It is a draggable class, but does not handle drags itself
// STATELESS
// PROPS
// * rank - key for sorting order
// * Content - Content of div
// * data-id - unique ID for handling drag events
export default class Action extends Component {

	render() {
		return (
				<div className = "action" draggable = "true" data-id = {this.props.dataId} >
						<p className = "row">{this.props.rank}    </p><p className = "row">{this.props.content}</p>
				</div>
			)

	}
}