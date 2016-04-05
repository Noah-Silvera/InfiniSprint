"use strict";
/* eslint-disable no-var, strict */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config'); 
var socketio = require('socket.io');
var google_api = require('./scripts/google_api');
var websocket_api = require('./scripts/websocket_api');

var fs = require('fs');
var readline = require('readline');






  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// Set up google API's /////////////////////////////
//---------------------------------------------------------------------------------------------------//

google_api.getAuth()

  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// START THE SERVER /////////////////////////////
//---------------------------------------------------------------------------------------------------//


// after waitin  for webSockets to initialize, start the WebpackDevServer
initializeWebsockets.then( function (resolve) {
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
  }, function (reject){
    console.log(reject)
    process.exit(1)
  }
);
