var fs = require('fs');
var path = require('path')
var moment = require('moment')
var data_utils = require('./data_utils')


var userDataPath = path.join( __dirname, './../user_data/')
var dataFileName = 'events.json'
var dataFilePath = path.join( userDataPath + dataFileName )
  
// UNIMPLEMENTED
// UNTESTED
// using an events object, updates the locally stored data in a JSON text file
// See inside for detailed rules
module.exports.updateLocalData = updateLocalData
function updateLocalData (events,callback) {
  console.log('updating local data....')

  // purge uneccesary data for quick read / writes
  var propsToKeep = ['summary','description','id','start']
  events = data_utils.purgeProperties(events,propsToKeep)
  // JUST FOR TESTING DELETE LATER
  events = events.slice(0,20)

  processCalendarResponse(events, callback)
}

function processCalendarResponse(events, callback){
 // see if the event data file already exists
  fs.access( dataFilePath, fs.F_OK, function(err) {
    if(err) {
      // no updates to perform
      console.log('event data does not exist')

      // If file doesn't exist
      // chunk the event data into sprint | backlog 
      var initData = createInitialEventData(events)
      // write this to a file
      data_utils.writeData(initData,dataFilePath,callback)
    } else {
      // perform updates to the local data

      applyCalendarUpdates(events, function(updatedData,callback){
        data_utils.writeData(updatedData,dataFilePath,callback)
      })
    }
  });
}


function applyCalendarUpdates(events,callback){
  fs.readFile( dataFilePath, function(err, content){
    if(err){
      throw err
    } else {
      curEventData = JSON.parse(content)

      console.log( "curEventData keys " + Object.keys(curEventData) )

      // iterate over each of the events returned from the google calender API
      for (var calEvent in events){
        // iterate over the event lists in the currentEventData

        // skip loop if the property is from prototype
        if(!events.hasOwnProperty(calEvent)) continue;
        
        // look over all the lists in the events data
        var listIndex = 0;
        for (var list in curEventData){
          // skip loop if the property is from prototype
          if(!curEventData[list].hasOwnProperty(list)) continue;

          // attempt to find the local datas copy of the calendar event by id
          var localEvent = curEventData[list][events[calEvent].id]
          // If the calender event exists in the local event data somewhere
          if( localEvent !== undefined ){
            // update the events data
            localEvent = updateEvent(localEvent,calEvent)

            // we are in the sprint ( this is name of sprint category independent )
            if( listIndex === 0 ){
              if( compareEventDates( getEventDateObj(localEvent), getEventDateObj(calEvent)) !== 0 ){
                // THIS WILL NEED TO BE DYNAMICALLY DETERMINED ONCE DAYS ARE IMPLEMETNED
                // Move item from the sprint to top of backlog at the appropiate date
                moveEventToListIndex(localEvent, 0, curEventData[list], curEventData['backlog'] )
              }
            } else if( listIndex === 1 ){
              if( compareEventDates( getEventDateObj(localEvent), getEventDateObj(calEvent)) === 0 ){
                // THIS WILL NEED TO BE DYNAMICALLY DETERMINED ONCE DAYS ARE IMPLEMETNED
                // Move item from the backlog to the bottom of the sprint at the appropiate date
                moveEventToListIndex(localEvent, -1, curEventData['backlog'], curEventData[list])
              }
            }
            // === OUT OF SCOPE === If the item has changed date, move it to the top of the day list above it, or the bottom of the day list below it 

            // add a flag to say this exist still corresopnds to an active google calendar event
            data_utils.addPropsToObject( [{ "eventStillExists":"true"}] )

          } 
          // else if event in neither
          else {
              // if it's not an event on the current day
              if( compareEventDates( getEventDateObj(calEvent), new Date() ) === 0 ){
                // THIS WILL NEED TO BE DYNAMICALLY DETERMINED ONCE DAYS ARE IMPLEMETNED
                // create item at bottom of sprint
                // THE { calEvent } IS VERY SKETCHY TEST IT
                moveEventToListIndex(localEvent, -1, { calEvent }, curEventData['sprint'])
              } else 
              // This can be more precise if once dynamic days are implemented
              if( compareEventDates( getEventDateObj(calEvent), new Date() ) !== 0 ){
                // THIS WILL NEED TO BE DYNAMICALLY DETERMINED ONCE DAYS ARE IMPLEMETNED
                // create item at bottom of backlog AT APPROPIATE DAY LATER
                // THE { calEvent } IS VERY SKETCHY TEST IT
                moveEventToListIndex(localEvent, -1, { calEvent }, curEventData['backlog'])
              }



          }
        listIndex++
        }
      }


      //  at the end, iterate over the JSON objects and delete any events that don't have tags
      //  
      // stand in until I actually update the data  
      // return the updated data
      return callback(curEventData)
    }
  });
}


// UNTESTED
// If we haven't retrieved event data for the user before, 
// collect the event data
// split it into two chunks - current day -> days afterwards
// create a new events.json file with 
  // sprint = [current day events]
  // backlog = [current day events]
module.exports.createInitialEventData = createInitialEventData
function createInitialEventData(events){
  var initData = {
    "sprint" : {
      // ... rank of objects is recieved implicity through the order of the sorted array
    },
    "backlog" : {
      // ...
    }
  }

  // Victoria is -7h during daylight saving time http://www.timetemperature.com/tzbc/victoria.shtml

  // for each event recieved from google
  for( var i = 0; i < events.length; i++ ){
    
    // if this is an all day event
    if( typeof events[i].start !== undefined ){

      // events[i].start.date is in ISO string format, which defaults to UTC time
      // HAS COPIED CODE
      var eventDate = moment(events[i].start.date)

      // take events from todays date
      
      if( eventDate.diff(moment(),'days') !== 0 ){

        // slice out the non-all day events in the backlog
        // HAS COPIED CODE
        for( var j = i; j < events.length; j++ ){
          if( typeof events[j].start === undefined ){
            events = events.slice(0,j).concat(events.slice(j+1))
            j--
          }
        }

        // convert the events JSON array to a true array of objects 
        // that have one propety, the previous id property of the object
        // and this property contains all the event data
        var indexedEvents = data_utils.indexObjectById(events) 

        // uses the power of arrays to slice up the events object now indexed by id
        // convert that events array back to a object to re-allow indexing on the id
        // this will later allow a list of events to be indexed on their id
        // for extremely quick access and simpler coding
        initData.sprint = data_utils.convertSimpleArrayToObject( indexedEvents.slice( 0, i ) ) 
        initData.backlog = data_utils.convertSimpleArrayToObject( indexedEvents.slice( i ) )
        break;
      }
    }
    else {
      // cut out that non all day event
      // HAS COPIED CODE
      events = events.slice(0,i).concat(events.slice(i+1))
      i--
    }
  }
  return initData
}


// EDGE CASES UNTESTED
// using the google calender event response, this function
// updates the data referencing that event with the new data from the response
// returns the updated eventRef
module.exports.updateEvent = updateEvent
function updateEvent(localEventRef,calEvent){

  // takes two events; a local event, and a calendar event, 
  // updates all local event properties with the new calendar data
  // adds new properties if they exist in the calEvent
  // removes remotely controlled properties if they do not exist in the calEvent
  return localEventRef;
}


// UNIMPLEMENTED
// UNTESTED
// deletes the event eventRef from the data referenced by dataRef
module.exports.deleteEventById = deleteEventById
function deleteEventById(eventId,listRef){
  return listRef;
}



