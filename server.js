"use strict";
/* eslint-disable no-var, strict */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config'); 
var socketio = require('socket.io');
var google_api = require('./scripts/google_api');
var initializeWebsockets = require('./scripts/websocket_api').initializeWebsockets;

var fs = require('fs');
var readline = require('readline');
var path = require('path')



  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// Define globals /////////////////////////////
//---------------------------------------------------------------------------------------------------//

// paths
global.paths = {}

global.paths.userDataPath = path.join( __dirname, './user_data/')


  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// START THE SERVER /////////////////////////////
//---------------------------------------------------------------------------------------------------//


// after waitin  for webSockets to initialize, start the WebpackDevServer
initializeWebsockets( function startServer() {
  console.log("starting server")
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
