var appRoot = require('app-root-path')
var paths = require( appRoot + '\\_globals').paths

var fs = require('fs')
var path = require('path')

module.exports.purgeProperties = purgeProperties
/**
 * purgeProperties using an array of objects, 
 * purges all properties of the objects except the properties in keepArr 
 * @param  {Array} objArr  Array of objects to purge properties from 
 * @param  {Array} keepArr String array of properties to keep
 * @return {Array}         the Array of purged objects 
 */
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

module.exports.addPropsToObject = addPropsToObject
/*
// adds an array of simple javascript key val pair objects as prop value pairs to an object
// props:
  // [ { 1:"first"}, {2:"second"}]
// Target
  // {
        // "prop" : "i exist"
  // }
// Result
  // {
        // "prop" : "i exist"
        // 1:"first"
        // 2:"second"
 */
function addPropsToObject(target,newProps){
  // for each prop in props
  newProps.forEach( function( prop, index, arr ){
    var curKey = Object.keys(prop)[0]
    // add a new propery to the target object
    target[curKey] = prop[curKey] 
  });
}


// UNTESTED - Tested by overall black box 
module.exports.convertSimpleArrayToObject = convertSimpleArrayToObject
/**
// Converts a simple array in the form of
// [ { 1:"first" }, { 2:"second"}, { 3:"third"}]
// To a simple javascript object of
// { 
//    1:"first",
//    2:"second",
//    3:"third",
 * @param  {Array} simpleArray 
 * @return {Object}             
 */
function convertSimpleArrayToObject( simpleArray ){
  var newObj = {}

  simpleArray.forEach( function(curVal, index, arr ){
    objKey = Object.keys(curVal)[0]
    newObj[objKey] = curVal[objKey]
  });

  return newObj
}

// UNTESTED - Tested by overall black box
module.exports.indexObjectById = indexObjectById
/**
// indexObjectById Converts a array of javascript objects to an object with
the properties being all the id's of the objects in the array
Each properties value is an object containing the rest of the properties
in the original object
 * @param  {Array} objArr 
 * @return {Object}              A single object with the properties being the id's
 *                                 of every object in the array of objects
 */
function indexObjectById( objArr ){
    indexedOnId = []
    // convert the events JSON array to an array of objects
    // that have one property, the ID of the event
    objArr.forEach( function( curEv, index, arr ){
      var curEvId = new String(curEv.id)
      delete curEv.id
      var curObj = {}
      curObj[curEvId] = curEv
      indexedOnId.push(curObj)
    });

    return indexedOnId
}

// UNIMPLEMENTED
// UNTESTED
module.exports.moveObjectToListIndex = moveObjectToListIndex
/**
// Moves an event to a given index ( 0 based ) in a listObject
// passing -1 as the index moves the event to the bottom of the list
 * @param  {Object} object     The object in the list to move
 * @param  {Integer} index      the index to move the object in the new list
 * @param  {Object} oldListRef The old list containing the object
 * @param  {Object} newListRef the list to move the object into
 * @return {Object}            the newList with the object inserted
 */
function moveObjectToListIndex( object, index, oldListRef,newListRef ){

}

// UNTESTED - NWI
module.exports.writeData = writeData
/**
// ensures data is in a serializable format, then
// writes 'data' to a new file, then closes file access 
 * @param  {*}   data     anything with a toString method or an Object
 * @param  {path object or string}   filePath 
 * @return {callback}                         takes the callback and calls it with
 *                                            callback( data, [arg1 [arg2 [...]]] )
 *                                            with the argX being the arguments given after the callback
 */
function writeData(data,filePath,callback){
  var numberOfArgs = 3
  try {
    if( typeof(data) !== typeof("string") ){
      if( typeof(data) === typeof({ "json":"object "}) ){
        data = JSON.stringify(data)
      }
      else{
        data = data.toString()
      }
    }
  }
  catch( e ){
    throw ( "Could not serialize data " + err )
  }

  fs.open(filePath,'w', function(err,fd){
    if(err){
      throw err
    }
    else {
      fs.write(fd,data,function(err){
        if(err){
          throw err
        } else {
          fs.close(fd,function(){
            // apply all arguments given after the callback function to the callback
            var args = Array.prototype.slice.call(arguments).slice(numberOfArgs)
            return callback.apply(this,args)
          })
        }
      });
    }
  });
}

// UNTESTED - NWI
module.exports.fetchData = fetchData
/**
// Fetches any text data from a path
 * @param  {string or path object}   path     file to read
 * @return {callback}                         takes the callback and calls it with
 *                                            callback( data, [arg1 [arg2 [...]]] )
 *                                            with the argX being the arguments given after the callback
 */
function fetchData(path,callback) {
  var numberOfArgs = 2
  console.log("retrieving local data copy....")
  
  fs.readFile(path, function(err,data){
    if(err){
      throw err
    }
    else {
      // apply the data arguments followed by all other given arguments to the callback
      var args = Array.prototype.slice.call(arguments).slice(numberOfArgs)
      var args = [data].concat(args)
      return callback.apply(this,args)
    }
  })
}