var fs = require('fs');
var path = require('path')


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
  events = purgeProperties(events,propsToKeep)
  events = events.slice(0,20)

  // see if the event data file already exists
  fs.access( dataFilePath, fs.F_OK, function(err) {
    if(err) {
      console.log('event data does not exist')

      // If file doesn't exist
      // chunk the event data into sprint | backlog 
      var initData = createInitialEventData(events)
      // write this to a file
      writeEventData(initData,callback)
    } else {
      fs.readFile( dataFilePath, function(err, content){
        if(err){
          throw err
        } else {
          curEventData = JSON.parse(content)
          console.log( "curEventData keys " + Object.keys(curEventData) )

          // iterate over each of the events returned from the google calender API
          events.forEach( function( curEvent, evIndex, evArry ){



            // iterate over the event lists in the currentEventData
            // curEventData.keys().forEach( function( curKey, keyIndex, keyArray ) {
            //   if( curEventData[curKey][curEvent] !== undefined ){

            //     updateEvent(curEventData[curKey][])

            //     if( curKey === "sprint" ){

            //     }
            //   }
            // });

          });
        return callback()
        }
      });
    }
  });

  
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

}

// EDGE CASES UNTESTED
// using an array of objects, purges all properties of the objects except the properties in keepArr 
function purgeProperties( objArr, keepArr ){

  // new object to manipulate
  var newObjArr = []

  for(var i = 0; i < objArr.length; i++){
    var purgedObj = {}
    keepArr.forEach( function(curVal,index,array){
      // pull all the required properties from the old array item into the new
      purgedObj[curVal] = objArr[i][curVal]
    });
    // push this trimmed array item into our new object
    newObjArr.push(purgedObj)
  }

  return newObjArr
}

// UNTESTED
// ensures data is in a serializable format, then
// writes 'data' to a new file, then closes file access 
function writeEventData(data,callback){
  if( typeof(data) !== typeof("string") ){
    if( typeof(data) === typeof({ "json":"object "}) ){
      data = JSON.stringify(data)
    }
    else{
      data = data.toString()
    }
  }

  fs.open(dataFilePath,'w', function(err,fd){
    if(err)
      throw err
    else
      fs.write(fd,data,function(err){
        fs.close(fd,callback)
      });
  });
}

// UNTESTED
// If we haven't retrieved event data for the user before, 
// collect the event data
// split it into two chunks - current day -> days afterwards
// create a new events.json file with 
  // sprint = [current day events]
  // backlog = [current day events]
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
  var timeZoneOffset = "Z-07:00"

  console.time('initEvents')
  for( var i = 0; i < events.length; i++ ){
    
    // this is an all day event
    if( events[i].start ){

      // events[i].start.date is in ISO string format, which defaults to UTC time
      // HAS COPIED CODE
      var eventDate = new Date(events[i].start.date + timeZoneOffset)

      // take events from todays date
      
      if( eventDate.toDateString() !== new Date().toDateString() ){

        // slice out the all day events in the backlog
        // HAS COPIED CODE
        for( var j = i; j < events.length; j++ ){
          var backlogEventDate = new Date(events[j].start.date + timeZoneOffset)
          if( backlogEventDate.toDateString() !== new Date().toDateString() ){
            events = events.slice(0,j).concat(events.slice(j+1))
            j--
          }
        }

        // convert the events JSON array to a true array of objects 
        // that have one propety, the previous id property of the object
        // and this property contains all the event data
        var indexedEvents = indexObjectById(events) 

        // uses the power of arrays to slice up the events object now indexed by id
        // convert that events array back to a object to re-allow indexing on the id
        // this will later allow a list of events to be indexed on their id
        // for extremely quick access and simpler coding
        initData.sprint = convertSimpleArrayToObject( indexedEvents.slice( 0, i ) ) 
        initData.backlog = convertSimpleArrayToObject( indexedEvents.slice( i ) )
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
  console.timeEnd('initEvents')
  return initData
}

// Converts a simple array in the form of
// [ { 1:"first" }, { 2:"second"}, { 3:"third"}]
// To a simple javascript object of
// { 
//    1:"first",
//    2:"second",
//    3:"third",
// }
function convertSimpleArrayToObject( simpleArray ){
  var newObj = {}

  simpleArray.forEach( function(curVal, index, arr ){
    objKey = Object.keys(curVal)[0]
    newObj[objKey] = curVal[objKey]
  });

  return newObj
}


// Converts a array of javascript objects with one property
// the ID pulled from an object. The rest of the objects
//  properties are the content of this id
function indexObjectById( simpleObject ){
    indexedOnId = []
    // convert the events JSON array to an array of objects
    // that have one property, the ID of the event
    simpleObject.forEach( function( curEv, index, arr ){
      var curEvId = new String(curEv.id)
      delete curEv.id
      var curObj = {}
      curObj[curEvId] = curEv
      indexedOnId.push(curObj)
    });

    return indexedOnId
}

// using the google calender event response, this function
// updates the data referencing that event with the new data from the response
// returns the updated eventRef
function updateEvent(eventRef,calEvent){
  return ;
}


// UNIMPLEMENTED
// UNTESTED
// deletes the event eventRef from the data referenced by dataRef
function deleteEvent(eventRef,dataRef){
  return ;
}

// UNIMPLEMENTED
// UNTESTED
// Moves an event to the top of a given list 
// Check if theres a built in JSON function that already does this
function moveEventToTop( eventRef,listRef ){
  ;
}

// UNIMPLEMENTED
// UNTESTED
// Moves an event to the top of a given list 
// Check if theres a built in JSON function that already does this
function moveEventToBottom( eventRef,listRef ){
  ;
}