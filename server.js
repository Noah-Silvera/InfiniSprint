var paths = require('./scripts/utils/_globals').paths
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config'); 
var socketio = require('socket.io');
var log = require('./scripts/utils/log_setup')

var initializeWebsockets = require('./scripts/server/websocket_api').initializeWebsockets;

// set up loggin with winston

log.init()


  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// START THE SERVER /////////////////////////////
//---------------------------------------------------------------------------------------------------//


// after waitin  for webSockets to initialize, start the WebpackDevServer
initializeWebsockets( function startServer(socket) {
  w.log('info',"starting server")
  var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats : 'errors-only'
  }).listen(5000, 'localhost', function (err) {
      if (err) {
        w.log('error',err);
      }
      w.log('info','Listening at localhost:5000');
      
      
    });
});
