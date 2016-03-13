// Need this for the css styles to be included
import './../../styles/styles.css'
// need this to create a proper react component
import React, {Component} from 'react';
import ActionList from './ActionList'


// when Import 'App' is called, this object is exported
// it is an object with one function, render() 
export default class Frame extends Component {
	constructor(props){
		super(props)
		fs.readFile('./../../auth.txt', (err,data) => {
			if (err) throw err
			else this.state = JSON.parse(data)
		});
	}  
  render() {
    console.log(this.state)
  	var actionItems = ['hello','world']
  	var emptyList = []


    return (
      // Add your component markup and other subcomponent references here.

      <div className = "frame" >
        <ActionList actions={emptyList}/>
        <div className = "separator" />
        <ActionList actions={actionItems}/>
      </div>

    );
  }
}
