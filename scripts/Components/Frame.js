// Need this for the css styles to be included
import './../../styles/styles.css'
// need this to create a proper react component
import React, {Component} from 'react';
import ActionList from './ActionList';
import Header from './Header';
import Heading from './Heading';
var globals = require('globals');

// when Import 'App' is called, this object is exported
// it is an object with one function, render() 
export default class Frame extends Component {
	constructor(props){
		super(props)
	}  
  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <div className = "frame" >
        <Header content="Agile Calendar"/>
        <Heading content="Current Sprint"/>
        <ActionList actions={Frame.getSprintItems()}/>
        <Heading content="Backlog"/>
        <ActionList actions={Frame.getBacklogItems()}/>
      </div>

    );
  }
  static getBacklogItems() {
    return ( [] )
  }
  static getSprintItems() {
    return ( [
      {
        content:'hello',
        key:0
      },
      {
        content:'world',
        key:1
      }
    ] )
  }
}
