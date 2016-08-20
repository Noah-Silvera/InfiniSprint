var MongoClient = require('mongodb').MongoClient

var events = null

var forbiddenProps = ['calId','_id']


var url = 'mongodb://localhost:27017/CalEvents';
MongoClient.connect(url, function(err, db) {
  if(err) throw err
  console.log("Connected correctly to server.");

  events = db.collection('events')
});
 
exports.getEvent = getEvent

function getEvent(calId,eventId){
    return new Promise((resolve, reject) => {

        events.find(
            {
                '_id': eventId,
                'calId': calId
            }).limit(1).toArray().then( (docs) => {
                if( docs.length === 0 ){
                    var err = new Error('Could not find Item')
                    err.type = 'NOTFOUND'
                    reject(err)
                } else {
                    var event = docs[0]                    
                    event = removeBlackListedProps(event, forbiddenProps)
                    resolve(event)
                }
            }, (err) => {
                reject(err)
            })
    });
}

exports.createEvent = createEvent

function createEvent(calId,event){
    return new Promise((resolve, reject) => {

        event.calId = calId
        event._id = event.id

        events.insertOne(event).then( (res) => {
            if( res.insertedCount !== 1) reject( new Error("Failed to insert document. InsertedCount !== 1"))

            event = removeBlackListedProps(event, forbiddenProps)
            resolve(event)

        }, (err) => {
            reject(err)
        })
    });
}


exports.updateEvent = updateEvent

function updateEvent(calId,event){
    return new Promise((resolve, reject) => {

        event.calId = calId
        event._id = event.id

        events.replaceOne(
            {
                '_id': event.id,
                'calId': calId
            }, event ).then( (res) => {

                event = removeBlackListedProps(event, forbiddenProps)
                resolve(event)
            }, (err) => {
                reject(err)
            })
    });
}

exports.deleteEvent = deleteEvent

function deleteEvent(calId,eventId){
    return new Promise((resolve, reject) => {

        event.calId = calId
        event._id = event.id

        events.deleteOne(
            {
                '_id': eventId,
                'calId': calId
            }).then( (res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
    });
}


/////////////////////////////////////////////////////
////////////////////// HELPER FUNCTIONS //////////////
/////////////////////////////////////////////////////


function removeBlackListedProps(obj,list){
    for( var prop in obj){
        if( obj.hasOwnProperty(prop) ){
            for(var i =0; i < list.length; i++){
                var forbiddenProp = list[i]

                if( prop == forbiddenProp){
                    delete obj[forbiddenProp]
                }
            }
        }
    }

    return obj;
}