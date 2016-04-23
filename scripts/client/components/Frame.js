"use strict";


import './../../../styles/styles.css'
import React, {Component} from 'react';
import ActionList from './ActionList';
import Header from './Header';
import Heading from './Heading';
  
// This frame represents the main 
// component of the app - the frame that renders the backlog and sprint items
// STATE 
// * This component holds the state of the backlog and sprint lists
// * allowing you to drag between lists easily by keeping track of both.
// PROPS
export default class Frame extends Component {
	constructor(props){
		super(props);
    this.socket = io.connect('http://localhost'); // io is imported in index.html    
    if( !this.socket ){
      console.log("!!! Could not initialize socket !!!")
    }
    // initial state - no objects in the frame are being dragged
    this.dragItem = null
    // Pull the google calender item's from the server, process them and use them as our state ( test data for now )
    // State should be of the following form
        // { "backlog" : [
        //      {
        //        "content": "have a great life",
        //        "dataId": 0,
        //        "rank": 1
        //      }, ...
        //    ],
        //  "sprint" : [
        //        {
        //          "content": "Love Everyone",
        //          "dataId": 2,
        //          "rank": 1
        //        }, ...
        //      ]
        //    }
        // }
    // Every list of google cal tasks should have unique rank within that list
    // but every single task must have a unique dataID 
        this.state = { "backlog" : [
                      {
                        "content": "have a great life",
                        "dataId": 0,
                        "rank": 1
                      }, {
                        "content": "have fun",
                        "dataId": 1,
                        "rank": 2
                      }, {
                        "content": "eat bread",
                        "dataId": 2,
                        "rank": 3
                      }, {
                        "content": "play games",
                        "dataId": 3,
                        "rank": 4
                      }, {
                        "content": "be happy",
                        "dataId": 4,
                        "rank": 5
                      }
                    ],
                    "sprint" : [
                      {
                        "content": "fuck bitches",
                        "dataId": 5,
                        "rank": 1
                      }, {
                        "content": "get money",
                        "dataId": 6,
                        "rank": 2
                      }
                    ]
                  }

	}  

  componentDidMount(){
    this.socket.on('eventsUpdated', function updateEvents(content){
      console.log('processing recieved events...')
      console.log(content)
      // this.state['sprint'] = content
    })

    // this.socket.emit('getSprintItems')

  }

  onClick = (e) => {
    var targetClass = e.target.getAttribute('class').toString()

    // handle a user wanting to refresh their lists
    var refreshRegex = new RegExp("( |^)refreshButton( |$)")
    if ( refreshRegex.exec(targetClass) != null ){
      console.log('asking for events...')
      this.socket.emit('updateEvents')
    }

    e.preventDefault()
    e.stopPropagation()
  }


  // Tells the frame what object is being dragged to handle the drop later
  onDragStart = (e) => {
    // console.log(class)
    // console.log("drag started")
    // console.log(e.target.getAttribute('data-id'))
    this.dragItem = e.target
  }

  // When a object is dragged over another valid object
  onDragEnter = (e) => {

    // local variable to complement the this.dragItem
    var dropItem = e.target
    // console.log("dragged over : " + dropItem)
    // console.log("currently dragged : " + this.dragItem)

    // Ensure that the user is dragging two valid objects
    if( dropItem != null && this.dragItem != null) {

      // Get the class of both items
      var dropItemClass = dropItem.getAttribute('class').toString()
      var dragItemClass = this.dragItem.getAttribute('class').toString()

      // filter action items ( exclude actionLists )
      var actionRegex = new RegExp("( |^)action( |$)")

      // both action classes
      if ( actionRegex.exec(dropItemClass) != null && actionRegex.exec(dragItemClass) != null ){
        // console.log('both action classes')
        // have unique id's
        if( dropItem.getAttribute('data-id') != this.dragItem.getAttribute('data-id')){
          // console.log('have unique ids')
          // swap the action itmes
          this.swapActionItems(this.dragItem,dropItem)
        }
      } 
      // Oppurtunity here to implement drag with other types of objects
    }

    // Prevent the browsers default drag and drop behaviour from occuring
    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  // assumes the items are both in a ActionList
  // NOT SWAPPING RANK SWAPPING ID'S DOING IT WRONG
  swapActionItems = (dragItem,dropItem) => {
    // console.log(dragItem.parentNode.getAttribute('class') + " - " + dragItem.parentNode.getAttribute('data-id'))
    var oldState = this.state
    // console.log("old state")
    // console.log(oldState)
    // console.log("old state" + JSON.stringify(oldState) )

    var targetArray = null; 
    // 0 = sprint items, 1 = backlog
    if( dragItem.parentNode.getAttribute('data-id') == 0 ){
      targetArray = 'sprint'
    } 
    if( dragItem.parentNode.getAttribute('data-id') == 1 ){
      targetArray = 'backlog'
    } 

    var dragRank = Frame.getPropByDataId(oldState[targetArray],'rank',dragItem.getAttribute('data-id'))
    var dropRank = Frame.getPropByDataId(oldState[targetArray],'rank',dropItem.getAttribute('data-id'))

    Frame.setPropByDataId(oldState[targetArray],'rank',dropRank, dragItem.getAttribute('data-id') )
    Frame.setPropByDataId(oldState[targetArray],'rank', dragRank, dropItem.getAttribute('data-id') )

    this.setState( oldState )
    // console.log("new state"  )
    // console.log(this.state  )
  }

  // prevent default behaviour and tell the frame that nothing is being dragged
  onDragEnd = (e) => {
    e.preventDefault()
    this.dragItem = null
  }

  // retrieves the prop "prop" of an object using the dataId attribute as a key
  static getPropByDataId (object,prop,dataId) {
    for(var i = 0; i < object.length; i++) {
      if( object[i]["dataId"] == dataId  ) {
        return object[i][prop]
      }
    }
  }




  // sets the prop "prop" of an object to value using  dataID as a key
  static setPropByDataId (object,prop,value, dataId) {
    // console.log("-----------------------------")
    // console.log( "start of setting" + JSON.stringify(object) )
    for(var i = 0; i < object.length; i++) {
      if( object[i]["dataId"] == dataId  ) {
        // console.log("object" + JSON.stringify( object[i] ) )
        // console.log("value" + value)
        // console.log("before change" + JSON.stringify( object[i] ) )
        object[i][prop] = value
        // console.log("after change" + JSON.stringify( object[i] ) )  
      }
    }  
    // console.log( "end of setting" + JSON.stringify(object) )
    // console.log("-----------------------------")
  }

  // Renders the frame for the backlog and action items using ActionLists and headings
  // binds the dragging event
  render = () => {



    return (
      // Add your component markup and other subcomponent references here.
      <div className = "frame" onDragStart = {this.onDragStart} onDragEnter = {this.onDragEnter} onDragEnd = {this.onDragEnd} onClick = {this.onClick} >
        <Header content="InfiniSprint"/>
        <Heading content="Current Sprint"/>
        <ActionList actions={this.state['sprint']} dataId = {0}/>
        <Heading content="Backlog"/>
        <ActionList actions={this.state['backlog']} dataId = {1}/>
      </div>

    );
  }
}