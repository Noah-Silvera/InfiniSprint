var paths = require('./utils/_globals').paths
var fs = require('fs')
var path = require('path')
var log = require('./utils/log_setup')
var express = require('express')
var app = express()
var dbAdapter = require('./db_adapter')
var bodyParser = require('body-parser')
var eventProcessing = require('./event_processing')
var moment = require('moment')

var root = 'src/'

// set up express static directories
app.use(express.static(path.join(root,'/scripts/client').toString()));
app.use(express.static(path.join(root,'/scripts/client/lib').toString()));
app.use (express.static(path.join(root,'/static').toString()));
app.use(express.static(path.join(root,'/css').toString()));

          
            
// load static files for serving      
var indexHtml = fs.readFileSync(path.join(root,'static/index.html'));
var index = fs.readFileSync(path.join(root,'scripts/client/index.js'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//enable cors for google domain

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routing for the app homepage
app.get('/', function( req, res){
  res.writeHead(200, {'Content  -Type': 'text/html'});
  res.end(indexHtml);
  res.send()
}); 

// retrieve the API and Client keys from a secret file
app.get('/keys', function(req,res){
    var keys = fs.readFileSync(path.join(root, '/keys.json'));
    res.send(keys)
}) 

app.post('/events', function(req,res){
    var events = req.body;


})

app.route('/event/:calId/:eventId')
    .get( (req,res) => {
        w.info('retrieving event data...')

        dbAdapter.getEvent(req.params.calId, req.params.eventId).then( (event) => {

            res.status(200).send(event)
            
        }, (err) => {
            w.error(err)

            if( err.type == 'NOTFOUND'){
                res.status(404).send()
            }

            res.status(500).send("Database request failed")
        })

    })
    .post( (req,res) => {
        w.info('posting event data...')
        var event = req.body

        dbAdapter.listEvents( req.params.calId, event.start.date ).then( (currentEvents) => {

            event = eventProcessing.rankLast(event, currentEvents )

            return dbAdapter.createEvent(req.params.calId, event)
        }).then( (event) => {

            return res.status(200).send(event)

        }).catch( (err) => {
            w.error('Unknown error in creating event')
            w.error(err)
            return res.status(500).send("Error in creating event")

        })
    })
    .put( (req,res) => {
        w.info('updating event data...')
        var event = req.body

        Promise.all([ 
            dbAdapter.getEvent( req.params.calId, req.params.eventId),
            dbAdapter.listEvents( req.params.calId, event.start.date ) 
        ]).then( (values) => {
            var [storedEvent, currentEvents] = values;
            
            if( moment(event.start.date).isBefore( moment(storedEvent.start.date) ) ){
                // new date is earlier. event should be ranked last in it's new list'
                event =  eventProcessing.rankLast(event, currentEvents)

            } else if( moment(event.start.date).isAfter( moment(storedEvent.start.date)) ){
                // new date is later. event should be ranked higher in it's new list'
                event = eventProcessing.rankFirst(event, currentEvents)
            } else {
                // the event has the same date. no change to rank, but other data may have changed
            }


            // update the database with the information
            return  dbAdapter.updateEvent( req.params.calId, event )

        }).then( (event) => {
 
            res.status(200).send(event)

        }).catch( (err) => {

            w.error(`Unknown error in updating event with id:${req.body.id} by overwriting with creation`)
            w.error(err)
            res.status(500).send("Error in updating event")

        })
    })
    .delete( (req,res) => {
        w.info('deleting event data...')
        dbAdapter.deleteEvent(req.params.calId, req.params.eventId).then( () => {
            res.status(200).send('event deleted')
        }, (err) => {
            w.error(err)
            res.status(500).send('could not delete event')
        })
    })
    
 
// set up loggin with winston

log.init()

  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// START THE SERVER /////////////////////////////
//---------------------------------------------------------------------------------------------------//


// after waitin  for webSockets to initialize, start the WebpackDevServer

w.log('info',"starting server")
app.listen(3000, function(){
console.log('listening on localhost:3000')  
})

