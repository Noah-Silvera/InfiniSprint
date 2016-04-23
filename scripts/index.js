import {paths} from './../_globals'
import React from 'react';
import {render} from 'react-dom';
import Frame from './client/components/Frame'


var scriptURLs = ["http://localhost:80/socket.io/socket.io.js","https://apis.google.com/js/platform.js"]

// Loads an array of scripts synchronously and then executes the callback
function loadScripts(scriptURLs, callback){
		
	// loaded all the scripts
	if( scriptURLs.length === 0 ){
		return callback()
	}

	var curScriptURL = scriptURLs.pop()
	var curScript = document.createElement('script')
	curScript.setAttribute('src',curScriptURL)

	// creating a script element is async by default
	curScript.async = false

	// once we have loadedd the current script
	curScript.addEventListener('load', function loaded(e){
		console.log("loaded " + e.target.getAttribute('src').toString() )
		// start loading the next script
		loadScripts(scriptURLs, callback)
		return;
	});

	console.log("loading " + curScriptURL + "...")
	// insert the script into the dom to be loaded
	document.body.insertBefore(curScript,document.body.firstChild);
}

// REnder the document once the socketIO script has loaded ( yayyy sockets )
// initialize the document

loadScripts( scriptURLs, function renderDom(){
	console.log("loading DOM ...");

	// hand control of the DOM over to react
	render(
		<div>
			<Frame />
		</div>, document.getElementById('root')
	)
});


