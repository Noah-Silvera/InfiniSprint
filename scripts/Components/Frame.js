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
  // fakes a JSON string that was returned from the server
  // turns it into a Javascript object ( suitable for the interactive state it will be used for )
  static getBacklogItems() {
    return JSON.parse(
    '[{\
        "content": "have a great life",\
        "key": 0,\
        "rank": 1\
      }, {\
        "content": "have fun",\
        "key": 1,\
        "rank": 2\
      }]')
  }
  static getSprintItems() {
    return JSON.parse(
    '[{\
        "content": "fuck bitches",\
        "key": 0,\
        "rank": 1\
      }, {\
        "content": "get money",\
        "key": 1,\
        "rank": 2\
      }]')
  }
}