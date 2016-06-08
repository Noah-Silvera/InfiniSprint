var paths = require('./utils/_globals').paths
var consts = require('./utils/_globals').consts
var config = require('./utils/_globals').config


var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');
var readline = require('readline');
var path = require('path');
var sync_local_data = require('./sync_local_data')
var moment = require('moment')

// If modifying these scopes, delete your previously saved credentialsentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-backlog.json';



  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// AUTHORIZATION FUNCTIONS /////////////////////////////
//---------------------------------------------------------------------------------------------------//
exports.getAuth = getAuth
/**
 * Gets authorization to use google library function using the client secret
 * sends this Oauth to the callback 
 * @param  {any} callback
 * @return {callback(Oauth)} returns a callback called with the authorization produced
 */
function getAuth(callback) {
  // Load client secrets from a local file.
  var x = path.join( paths.userDataPath, '/client_secret.json')
  fs.readFile( './user_data/client_secret.json' , 'utf8', function processClientSecrets(err, content) {
    if (err) {
      w.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Drive API.
    authorize(JSON.parse(content), callback);
  });
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  w.log('silly','Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        w.log('silly','Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  w.log('Token stored to ' + TOKEN_PATH);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                Request Functions                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////

// UNIMPLEMENTED
// UNTESTED
exports.deleteEvent = deleteEvent
/**
 * Deletes an event from the remote google calendar
 * @param  {any} eventId Id of the event to delete
 * @return {callback} (err) or (null)
 */
function deleteEvent(eventId, callback){
  
    

}

// UNTESTED
exports.createEvent = createEvent
/** 
 * Should take in a obj with fields applicable to 
 * google calendar and use the calendar API to make a new event
 * @param  {any} object
 * @return {callback} (err) or (null,event)
 */
function createEvent(object,callback){
  
  getAuth( function(auth){
    
    var calendar = google.calendar('v3');

    var event = {};
    
    // valid properties for a google calendar event
    var eventPropWhiteList = {  'summary':'0',
                                'location':'0',
                                'description':'0',
                                'start':'0',
                                'end':'0',
                                'recurrence':'0',
                                'attendees':'0',
                                'reminders':'0'
                              }
    
    
    // cycle through all the properties in the event given
    for( var prop in object){
      w.debug(prop)
      // ensure they are valid properties for a google calender event
      if( eventPropWhiteList[prop] ){
        // add every valid property to the event object
        event[prop] = object[prop]
      }
    }
    
    w.debug("Event object passed to google api")
    w.debug(event)
    console.log(event)

    calendar.events.insert({
      auth: auth,
      calendarId: 'primary',
      resource: event,
    }, function(err, event) {
      if (err) {
        w.log('error','There was an error contacting the Calendar service: ' + err);
        return callback(err);
      }
      w.log('info','Event created: %s', event.htmlLink);
      return callback(null,event)
    });
  })
}

// UNIMPLEMENTED
// UNTESTED
exports.updateEvent = updateEvent
/**
 * @param  {any} Should take in an obj with an id and fields applicable to the calendar API to update
 * @return {callback} (err) or (null,event)
 */
function updateEvent(event,callback){

}



exports.getEventsForTimeSpan = getEventsForTimeSpan
/**
 * formats the date objects to go from
 * goes from 0:00 am on the startDate to 11:59 on the end date
 * and passes this on to another function to get the events, and the events
 * are passed to the callback
 * @param  {moment}   startDate 
 * @param  {moment}   endDate   
 * @return {callback(err, events)}             
 */
function getEventsForTimeSpan( startDate, endDate, callback ) {

  var timeMin = startDate.startOf('day')
  var timeMax = endDate.endOf('day')
  w.log('debug','getting events from'.trim())
  w.log('debug',timeMin.format().trim())
  w.log('debug',"to ->".trim())
  w.log('debug',timeMax.format().trim())
  w.log('debug',"...")

  getAuth( function(auth){

    var calendar = google.calendar('v3');
    var eventsReq = {
      auth: auth,
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      maxResults: 250, // this is the default value
      singleEvents: true,
      orderBy: 'startTime'
    }
    calendar.events.list(eventsReq, function(err, response) {
      
      w.log('debug','Google API request')
      w.log('debug',eventsReq)
      
      w.log('debug', 'Google API Response')
      w.log('debug',response)
      
      if (err) {
        w.log('error','The API returned an error: ');
        w.log('error',err)
        err.message = 'Could not retrieve events. Possibly authorization problems. Check your client secret' + err.message

        return callback(err)
      }
      
      var events = response.items;

      return callback(null,events)
    });
  })
}


/**
 * Syncs the calender events for sprint day + sprint_length with the local Copy of the events
 * @return {callback}            updates the local data then finally calls the callback with no args
 */
exports.syncCalendar = function syncCalendar( callback ) {

  // the current date - starting at the very begginning of the day
  var startDate = moment()
  endDate = startDate.add(consts.sprintLength,'days')

  getEventsForTimeSpan( startDate, endDate, function(err,events){
    if(err){
      throw err
    }
    
    sync_local_data.updateData(events,callback)
  })

}
