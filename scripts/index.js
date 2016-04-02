import React from 'react';
import {render} from 'react-dom';
import Frame from './Components/Frame';

// initialize the document
render(
		<Frame />, document.getElementById('root')
);

var script = document.createElement('script');
// script.setAttribute('type', 'text/javascript');
script.setAttribute('src', 'http://localhost:80/socket.io/socket.io.js');
// script.setAttribute('async', false);
// script.setAttribute('defer', false);
document.body.insertBefore(script,document.body.firstChild);

script.onLoad = function(){
	console.log('looking for socket')
	debugger
	var socket = io.connect('http://localhost'); // io is imported in index.html
}

