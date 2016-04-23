"use strict";

import './../../../styles/styles.css'
import React, {Component} from 'react';


export default class Header extends Component {
	render = () => {
		return (
				<div className = "header">
					<h1 className = "title">{this.props.content}</h1>
					<button className="refreshButton" onClick = {this.refreshButton} />
				</div>
			)
	}

  refreshButton = (e) => {
    console.log('asking for events...')
    this.props.socket.emit('refreshData')

    e.preventDefault()
    e.stopPropagation()
  }
}