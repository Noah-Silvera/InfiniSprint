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

	// REnder the document once the socketIO script has loaded ( yayyy sockets )
	// initialize the document
	render(
		<div>
			<Frame />
		</div>, document.getElementById('root')
	);

});



document.body.insertBefore(script,document.body.firstChild);

