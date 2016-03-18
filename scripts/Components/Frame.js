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
  render = () => {
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
    return ( [
      {
        content: "have a great life",
        key:0
      },
      {
        content : "have fun",
        key: 1
      }
    ] )
  }
  static getSprintItems() {
    return ( [
      {
        content:'Be nice to people',
        key:0
      },
      {
        content:'Go outside',
        key:1
      }
    ] )
  }
}
