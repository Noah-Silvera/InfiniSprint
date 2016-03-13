// Need this for the css styles to be included
import './../../styles/styles.css'
// need this to create a proper react component
import React, {Component} from 'react';
import ActionList from './ActionList'


// when Import 'App' is called, this object is exported
// it is an object with one function, render() 
export default class Frame extends Component {
  render() {
    return (
      // Add your component markup and other subcomponent references here.

      <div className = "frame" >
        <ActionList />
        <div className = "separator" />
        <ActionList />
      </div>

    );
  }
}
