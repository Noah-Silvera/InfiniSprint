import React from 'react';
import {render} from 'react-dom';
import Frame from './Components/Frame';

var scriptURLs = ["http://localhost:80/socket.io/socket.io.js","https://apis.google.com/js/platform.js"]

function loadScripts(callback){
	
	if( scriptURLs.length === 0 ){
		return callback()
	}

	var curScriptURL = scriptURLs.pop()
	var curScript = document.createElement('script')
	curScript.setAttribute('src',curScriptURL)
	curScript.async = false
	// curScript.setAttribute('defer',true)
	curScript.addEventListener('load', function loaded(e){
		console.log("loaded " + e.target.getAttribute('src').toString() )
		loadScripts(callback)
		return;
	});
	console.log("loading " + curScriptURL + "...")
	document.body.insertBefore(curScript,document.body.firstChild);
}

// REnder the document once the socketIO script has loaded ( yayyy sockets )
// initialize the document

loadScripts( function renderDom(){
	console.log("loading DOM ...");

	render(
		<div>
			<Frame />
		</div>, document.getElementById('root')
	)
});


