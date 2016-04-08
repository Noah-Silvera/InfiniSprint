var socketio = require('socket.io')
var google_api = require('./google_api')

// the server should not start until the websockets are initialized, this is a non-blocking callback function
module.exports = initializeWebsockets = function initializeWebsockets(callback){
	// create websocket infrastrcture
	
	var io = socketio.listen(80)
	console.log("listening for socket requests on localhost:80")
	setUpListeners(io)
	return callback()

	  //----------------------------------------------------------------------------------------------------//
	 ///////////////////////////// Listener interface /////////////////////////////
	//---------------------------------------------------------------------------------------------------//
	

	function setUpListeners(io,callback){
		console.log('setting up listeners')

		io.on('connection', function(socket){
		  console.log("new connection")

		  socket.on('updateEvents', function() {
		    // once the data has been updated locally, this function fires off the data in a eventsUpdated event
		    updateEvents(socket)
		  });

		  socket.on('dragEvent', function(message) {
		    console.log("drag event received....")
		  });
		});
	};
}


  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// Handling socket requests /////////////////////////////
//---------------------------------------------------------------------------------------------------//



// TODO TODO TODO TODO TODO TODO TODO  
// Fetches the data that represents the calender events locally
function fetchLocalEvents(path,callback) {
  console.log("retrieving local data copy....")
  var data = {"events":"some content"}
  // do some fetching
	var args = Array.prototype.slice.call(arguments).slice(2)
	var args = [data].concat(args)
  return callback.apply(this,args)

}
// TODO TODO TODO TODO TODO TODO TODO  
// updates the content that populates the app, and then informs the client it has been updated with a
// eventsUpdated event
function updateEvents(socket) {
  
  console.log("retrieving events from google....");
  // syncs the networks google cal events to a local file
   google_api.syncCalendar( 
    // fetched that local file with the changes
    (function() {
    	fetchLocalEvents('events.txt',  function emitEventData(data,socket) {
        socket.emit('eventsUpdated', data)
        console.log('Sent local event data to client')
      }, socket ) 
     })
  );
}