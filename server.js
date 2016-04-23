var appRoot = require('app-root-path')
var paths = require( appRoot + '/_globals').paths
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config'); 
var socketio = require('socket.io');
var initializeWebsockets = require( paths.scriptsPath + '/server' + '/websocket_api').initializeWebsockets;

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
