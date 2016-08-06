var paths = require('./utils/_globals').paths
var socketio = require('socket.io');
var fs = require('fs')
var path = require('path')
var log = require('./utils/log_setup')
var initializeWebsockets = require('./websocket_api').initializeWebsockets;
var express = require('express')
var app = express()

var root = 'src/'

// set up express static directories
app.use(express.static(path.join(root,'/scripts/client').toString()));
app.use(express.static(path.join(root,'/scripts/client/lib').toString()));
app.use (express.static(path.join(root,'/static').toString()));
app.use(express.static(path.join(root,'/css').toString()));

          
            
// load static files for serving      
var indexHtml = fs.readFileSync(path.join(root,'static/index.html'));
var index = fs.readFileSync(path.join(root,'scripts/client/index.js'));

//enable cors for google domain

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routing for the app homepage
app.get('/', function( req, res){
  res.writeHead(200, {'Content  -Type': 'text/html'});
  res.end(indexHtml);
  res.send()
}); 

app.get('/keys', function(req,res){
    var keys = fs.readFileSync(path.join(root, '/keys.json'));
    res.send(keys)
}) 


// set up loggin with winston

log.init()


  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// START THE SERVER /////////////////////////////
//---------------------------------------------------------------------------------------------------//


// after waitin  for webSockets to initialize, start the WebpackDevServer
initializeWebsockets( function startServer() {
  w.log('info',"starting server")
  app.listen(3000, function(){
    console.log('listening on localhost:3000')  
  })
});
