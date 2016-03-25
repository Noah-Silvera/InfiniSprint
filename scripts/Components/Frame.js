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
    this.dragItem = null
    this.state = { "backlog" : [
                      {
                        "content": "have a great life",
                        "dataId": 0,
                        "rank": 1
                      }, {
                        "content": "have fun",
                        "dataId": 1,
                        "rank": 2
                      }
                    ],
                    "sprint" : [
                      {
                        "content": "fuck bitches",
                        "dataId": 3,
                        "rank": 1
                      }, {
                        "content": "get money",
                        "dataId": 4,
                        "rank": 2
                      }
                    ]
                  }
	}  

  onDragStart = (e) => {
    // console.log(class)
    console.log("drag started")
    // console.log(e.target.getAttribute('data-id'))
    this.dragItem = e.target
  }

  onDragEnter = (e) => {
    var dropItem = e.target
    console.log("dragged over : " + dropItem)
    console.log("currently dragged : " + this.dragItem)

    if( dropItem != null && this.dragItem != null) {

      var dropItemClass = dropItem.getAttribute('class').toString()
      var dragItemClass = this.dragItem.getAttribute('class').toString()

      var actionRegex = new RegExp("( |^)action( |$)")

      // both action classes
      if ( actionRegex.exec(dropItemClass) != null && actionRegex.exec(dragItemClass) != null ){
        console.log('both action classes')
        // have unique id's
        if( dropItem.getAttribute('data-id') != this.dragItem.getAttribute('data-id')){
          console.log('have unique ids')
          // swap the action itmes
          this.swapActionItems(this.dragItem,dropItem)
        }
      }
    }

    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  onDragEnd = (e) => {
    e.preventDefault()
    this.dragItem = null
  }

  // assumes the items are both in a ActionList
  // NOT SWAPPING RANK SWAPPING ID'S DOING IT WRONG
  swapActionItems = (dragItem,dropItem) => {
    console.log(dragItem.parentNode.getAttribute('class') + " - " + dragItem.parentNode.getAttribute('data-id'))
    var oldState = this.state
    console.log("old state" + JSON.stringify(oldState) )



    if( dragItem.parentNode.getAttribute("data-id") == 1 ){

      var temp = null
      oldState['backlog'].forEach( function(action, index, array) {

        // console.log("cur action " + JSON.stringify(action) )

        if( action['dataId'] == dragItem.getAttribute('data-id') ){
          var swapValue = null;
          if( temp != null ){
            swapValue = temp
          } else {
            swapValue = dropItem.getAttribute('data-id')
          }

          if( temp == null ){
            temp = action['dataId']
          } 

          console.log("cur action " + JSON.stringify(action) )
          console.log("swap 1 : swapVal : " + swapValue)
          array[index]['dataId'] = swapValue
          console.log("cur action " + JSON.stringify(action) )
          console.log('temp ' + temp)
          console.log("-----------------------")

        } else if( action['dataId'] == dropItem.getAttribute('data-id') ){
          var swapValue = null;
          if( temp != null ){
            swapValue = temp
          } else {
            swapValue = dropItem.getAttribute('data-id')
          }

          if( temp == null ){
            temp = action['dataId']
          } 

          console.log("cur action " + JSON.stringify(action) )
          console.log("swap 2 : swapVal : " + swapValue)
          array[index]['dataId'] = swapValue
          console.log("cur action " + JSON.stringify(action) )
          console.log('temp ' + temp)
          console.log("-----------------------")

        }
      });
    }

    console.log("new State " + JSON.stringify(oldState) )
    this.state = oldState

    return true
  }


  render = () => {
    return (
      // Add your component markup and other subcomponent references here.
      <div className = "frame" onDragStart = {this.onDragStart} onDragEnter = {this.onDragEnter} onDragEnd = {this.onDragEnd} >
        <Header content="Agile Calendar"/>
        <Heading content="Current Sprint"/>
        <ActionList actions={this.state['sprint']} dataId = {0}/>
        <Heading content="Backlog"/>
        <ActionList actions={this.state['backlog']} dataId = {1}/>
      </div>

    );
  }
}