var paths = require('./../utils/_globals').paths


var socketio = require('socket.io')
var google_api = require('./google_api')
var data_utils = require('./data_utils')
var sync_local_data = require('./sync_local_data');
var w = require('winston').loggers.get('main')
var join = require('path').join

exports.initializeWebsockets = initializeWebsockets 
/**
 * Intialize the neccesary socket io server and listeners
 * @return {callback}            calls the callback with no args
 */
function initializeWebsockets(callback){
	// create websocket infrastrcture
	
	var io = socketio.listen(80)
	w.log('info',"listening for socket requests on localhost:80")
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
	w.log('info','setting up listeners')

	io.on('connection', function(socket){
	  w.log('info',"new connection")

	  socket.on('refreshData', function() {
	  	w.log('info','refreshing data...')
	    // once the data has been updated locally, this function fires off the data in a eventsUpdated event
	    return refreshData(socket)
	  });

	  socket.on('updateEvents', function(event) {
  		w.log('info', 'updating event...')
  		return sync_local_data.updateLocalEvents( {},{}, function(){
	  	  socket.emit('eventsUpdated',{})
  		});
	  })

	  socket.on('deleteEvent', function( event) {
  		w.log('info','deleting event...')
  		return sync_local_data.deleteEventById({},{}, function(){
  			socket.emit('eventDeleted',{})
  		})
	  })

	});

	return callback(io)
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
  
  w.log('info',"retrieving events from google....");
  // syncs the networks google cal events to a local file
   google_api.syncCalendar( 
    // fetched that local file with the changes
    function() {
    	var eventsToFetch = join( paths.userDataPath, '/events.json' )
    	data_utils.fetchData( eventsToFetch ,  function emitEventData(data) {
        socket.emit('eventsUpdated', data)
        w.log('info','Sent local event data to client')
      })
     }
  );
}