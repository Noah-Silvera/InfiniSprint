import React from 'react';
import {render} from 'react-dom';
import Frame from './Components/Frame';


// load the socketIO infrastructure client side
var script = document.createElement('script');
// script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'http://localhost:80/socket.io/socket.io.js');
// script.setAttribute('async', false);
// script.setAttribute('defer', false);
script.addEventListener("load", function(){
	console.log('looking for socket')
	var socket = io.connect('http://localhost'); // io is imported in index.html


	socket.on('message',function(message){
		console.log(message)
	})


	socket.emit('dragEvent',"hello world");
	console.log("emmitted message");

	// initialize the document
	render(
		<div>
			<Frame />
		</div>, document.getElementById('root')
	);

	socket.emit('dragEvent',"hello world");


});



document.body.insertBefore(script,document.body.firstChild);

