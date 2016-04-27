var appRoot = require('app-root-path')
var paths = require( appRoot + '\\_globals').paths


var socketio = require('socket.io')
var google_api = require('./google_api')
var data_utils = require('./data_utils')
var sync_event_data = require('./sync_event_data');
var join = require('path').join

exports.initializeWebsockets = initializeWebsockets 
/**
 * Intialize the neccesary socket io server and listeners
 * @return {callback}            calls the callback with no args
 */
function initializeWebsockets(callback){
	// create websocket infrastrcture
	
	var io = socketio.listen(80)
	console.log("listening for socket requests on localhost:80")
	return setUpListeners(io,callback)
}

  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// Listener interface /////////////////////////////
//---------------------------------------------------------------------------------------------------//

/**
 * intialize the listeners for server events like fetching new calender event data
 * @param {socketio instance}   io
 * @return {callback} callback called with no args
 */
function setUpListeners(io,callback){
	console.log('setting up listeners')

	io.on('connection', function(socket){
	  console.log("new connection")

	  socket.on('refreshData', function() {
	  	console.log('refreshing data...')
	    // once the data has been updated locally, this function fires off the data in a eventsUpdated event
	    return refreshData(socket)
	  });

	  socket.on('updateEvent', function(event) {
  		console.log('updating event...')
  		return sync_event_data.updateEvent( {},{}, function(){
	  	  socket.emit('dataUpdated',{})
  		});
	  })

	  socket.on('deleteEvent', function( event) {
  		console.log('deleting event...')
  		return sync_event_data.deleteEventById({},{}, function(){
  			socket.emit('dataUpdated',{})
  		})
	  })

	});

	return callback()
};

  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// Handling socket requests /////////////////////////////
//---------------------------------------------------------------------------------------------------//

//UNTESTED
exports.refreshData = refreshData
/**
 * updates the content that populates the app, and then informs the client it has been updated with a
 * eventsUpdated event
 * @param  {socket} socket 
 * @return {websocket} fires off a eventsUpdated event 
 */
function refreshData(socket) {
  
  console.log("retrieving events from google....");
  // syncs the networks google cal events to a local file
   google_api.syncCalendar( 
    // fetched that local file with the changes
    function() {
    	var eventsToFetch = join( paths.userDataPath, '/events.json' )
    	sync_event_data.fetchLocalEvents( eventsToFetch ,  function emitEventData(data,socket) {
        socket.emit('dataUpdated', data)
        console.log('Sent local event data to client')
      }, socket ) 
     }
  );
}