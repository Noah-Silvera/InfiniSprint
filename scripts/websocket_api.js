var socketio = require('socket.io')
var google_api = require('./google_api')
var data_utils = require('./data_utils')
var join = require('path').join

module.exports.initializeWebsockets = initializeWebsockets 
/**
// Intialize the neccesary socket io server and listeners
 * @return {callback}            calls the callback with no args
 */
function initializeWebsockets(callback){
	// create websocket infrastrcture
	
	var io = socketio.listen(80)
	console.log("listening for socket requests on localhost:80")
	setUpListeners(io,callback)
}

  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// Listener interface /////////////////////////////
//---------------------------------------------------------------------------------------------------//

/**
// intialize the listeners for server events like fetching new calender event data
 * @param {socketio instance}   io
 * @return {Function} callback calls with no args
 */
function setUpListeners(io,callback){
	console.log('setting up listeners')

	io.on('connection', function(socket){
	  console.log("new connection")

	  socket.on('updateEvents', function() {
	    // once the data has been updated locally, this function fires off the data in a eventsUpdated event
	    return updateEvents(socket)
	  });

	  socket.on('dragEvent', function(message) {
	    console.log("drag event received....")
	  });
	});

	return callback()
};

  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// Handling socket requests /////////////////////////////
//---------------------------------------------------------------------------------------------------//


module.exports.updateEvents = updateEvents
/**
// updates the content that populates the app, and then informs the client it has been updated with a
// eventsUpdated event
 * @param  {socket} socket 
 * @return fires off a eventsUpdated event 
 */
function updateEvents(socket) {
  
  console.log("retrieving events from google....");
  // syncs the networks google cal events to a local file
   google_api.syncCalendar( 
    // fetched that local file with the changes
    function() {
    	var eventsToFetch = join( global.paths.userDataPath, '/events.json' )
    	fetchLocalEvents( eventsToFetch ,  function emitEventData(data,socket) {
        socket.emit('eventsUpdated', data)
        console.log('Sent local event data to client')
      }, socket ) 
     }
  );
}