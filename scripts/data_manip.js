var fs = require('fs');


// using an events object, updates the locally stored data in a JSON text file
// See inside for detailed rules
module.exports.updateLocalData = updateLocalData
function updateLocalData (events,callback) {
  console.log('updating local data....')

  // If file doesn't exist
    // take events from todays date
      // add to sprint part of data in order fetched
    // Take the rest of the events
      // add to backlog part of data in date order
  
  // If file does exist
  // Read file
  // Convert to JSON object
    // for each event in events
      // if event in sprint 
        // updateEvent()
        // if eventDate === currentDate
          // do nothing
        // else 
          // Move item to backlog at the bottom of the appropiate date
      // else if event in backlog
        // updateEvent()
        // if eventDate === currentDate
          // Move item to bottom of current sprint
        // else
          // Do nothing
          // === OUT OF SCOPE === If the item has changed date, move it to the top of the day list above it, or the bottom of the day list below it 
      // else if event in neither
        // If eventDate === currentDate
          // Move item to bottom of current sprint
        // else
          // move item to bottom of backlog
          // 
    // Problem - need to determine whether all the items in the stored data are items gathered from the retrieval
      //  This is a JSON object - we can modify it
      //  On each event in events, add a tag to the event it matches in the Data
      //  at the end, iterate over the JSON objects and delete any events that don't have tags

  return callback()
}


// using the google calender event response, this function
// updates the data referencing that event with the new data from the response
function updateEvent(eventRef,calEvent){
  return ;
}

// deletes the event eventRef from the data referenced by dataRef
function deleteEvent(eventRef,dataRef){
  return ;
}

// Moves an event to the top of a given list 
// Check if theres a built in JSON function that already does this
function moveEventToTop( eventRef,listRef ){
  ;
}

// Moves an event to the top of a given list 
// Check if theres a built in JSON function that already does this
function moveEventToBottom( eventRef,listRef ){
  ;
}

// compares the dates of the two events
// functions like the built in javascript cmp
function compareEventDates( firstEventRef, secondEventRef  ){
  return ;
}