"use strict";
/* eslint-disable no-var, strict */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');   
var socketio = require('socket.io')
var googleFunctions = require('./googleFunctions')

var fs = require('fs');
var readline = require('readline');


// gets the current daily all day events
function getSprintItems() {
  fs.readFile('client_secret.json', function getAllDayEvents(err,auth) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }

   // googleFunctions.getEventsForDate(auth,new Date())

  });
}


  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// Set up google API's /////////////////////////////
//---------------------------------------------------------------------------------------------------//

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, auth) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  googleFunctions.authorize(JSON.parse(auth), function(auth){
    fs.writeFile('auth.txt',JSON.stringify(auth), (err) => {
      if (err) throw err;
      else console.log('authorization saved')
    });
  });
});


  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// SET UP SERVERS/////////////////////////////
//---------------------------------------------------------------------------------------------------//


// since we rely on websockets in our entry point, need to wait for the server to have loaded 
function waitForDependencies (callback) {
  // little bit of polling to wait for websocket infrastructure to load ( neccesary before starting server )
  console.log("Load websockets")
  while( io == undefined || io === null ){
    console.log("waiting for web sockets....")
  }
  callback()
}

// create websocket infrastrcture

// console.log(io)
var io = socketio.listen(80)
// console.log(io)

io.on('connection', function(socket){
  console.log("new connection")

  socket.on('getSprintItems', function() {
    console.log("retrieving sprint items....");
    socket.emit('sprintItems', getSprintItems() )
  });

  socket.on('dragEvent', function(message) {
    console.log("drag event received....")
  });


})


  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// START THE SERVER /////////////////////////////
//---------------------------------------------------------------------------------------------------//


// after waiting for dependencies, start the WebpackDevServer
waitForDependencies( function() {
  var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(5000, 'localhost', function (err) {
      if (err) {
        console.log(err);
      }
      console.log('Listening at localhost:5000');

    });
});
