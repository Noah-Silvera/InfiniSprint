var fs = require('fs')

// EDGE CASES UNTESTED
// using an array of objects, purges all properties of the objects except the properties in keepArr 
module.exports.purgeProperties = purgeProperties
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
  // }
module.exports.addPropsToObject = addPropsToObject
function addPropsToObject(props,target){
  // for each prop in props
  props.forEach( function( prop, index, arr ){
    var curKey = Object.keys(prop)[0]
    // add a new propery to the target object
    target[curKey] = prop[curKey] 
  });
}


// EDGE CASES UNTESTED
// Converts a simple array in the form of
// [ { 1:"first" }, { 2:"second"}, { 3:"third"}]
// To a simple javascript object of
// { 
//    1:"first",
//    2:"second",
//    3:"third",
// }
module.exports.convertSimpleArrayToObject = convertSimpleArrayToObject
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
module.exports.indexObjectById = indexObjectById
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

// UNIMPLEMENTED
// UNTESTED
// Moves an event to a given index ( 0 based ) in a listObject
// passing -1 as the index moves the event to the bottom of the list
module.exports.moveObjectToListIndex = moveObjectToListIndex
function moveObjectToListIndex( object, index, oldListRef,newListRef ){

}

// UNTESTED
// ensures data is in a serializable format, then
// writes 'data' to a new file, then closes file access 
module.exports.writeData = writeData
function writeData(data,filePath,callback){
  if( typeof(data) !== typeof("string") ){
    if( typeof(data) === typeof({ "json":"object "}) ){
      data = JSON.stringify(data)
    }
    else{
      data = data.toString()
    }
  }

  fs.open(filePath,'w', function(err,fd){
    if(err)
      throw err
    else
      fs.write(fd,data,function(err){
        fs.close(fd,callback)
      });
  });
}