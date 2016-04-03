var google = require('googleapis');
var googleAuth = require('google-auth-library');
var fs = require('fs');
var readline = require('readline');

// If modifying these scopes, delete your previously saved credentialsentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-backlog.json';


  //----------------------------------------------------------------------------------------------------//
 ///////////////////////////// GOOGLE CALENDAR FUNCTIONS /////////////////////////////
//---------------------------------------------------------------------------------------------------//

module.exports.getAuth = function getAuth() {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', function processClientSecrets(err, auth) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    authorize(JSON.parse(auth), function(auth){
      fs.writeFile('auth.txt',JSON.stringify(auth), (err) => {
        if (err) throw err;
        else console.log('authorization saved')
      });
    });
  });
}

// TEST TEST TEST
// loads the saves 
function loadAuth(callback) {
  // Load client secrets from a local file.
  fs.readFile('auth.txt', callback);
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
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
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
  console.log('Token stored to ' + TOKEN_PATH);
}

// TODO TODO TODO TODO TODO

// formats the date objects to go from
// goes from 0:00 am on the startDate to 11:59 on the end date
// and passes this on to another function to get the events, and the events
// are passed to the callback
function getEventsForTimeSpan( startDate,endDate, callback,carryingCallback ) {

  var timeMin = startDate
  var timeMax = endDate
  console.log('getting events from')
  console.log(timeMin)
  console.log("to ->")
  console.log(timeMax)

  loadAuth( function (auth) {
    // middleman function allows us to pass the events gathered from list events into a callback
    listEvents(auth, startDate, endDate, callback,carryingCallback)
  });
}

// TODO TODO TODO TODO TODO


// lists the events for a certain time span, passes the events object onto the callback
function listEvents(auth, startDate, endDate, callback, carryingCallback) {
  var calendar = google.calendar('v3');
  // calendar.events.list({
  //   auth: auth,
  //   calendarId: 'primary',
  //   timeMin: startDate.toISOString(),
  //   timeMax: endDate.toISOString(),
  //   maxResults: 250, // this is the default value
  //   singleEvents: true,
  //   orderBy: 'updated'
  // }, function(err, response) {
  //   if (err) {
  //     console.log('The API returned an error: ' + err);
  //     return;
  //   }
  //   var events = response.items;
  //   if (events.length == 0) {
  //     console.log('No upcoming events found.');
  //   } else {
  //     console.log('Upcoming 10 events:');
  //     for (var i = 0; i < events.length; i++) {
  //       var event = events[i];
  //       var start = event.start.dateTime || event.start.date;
  //       console.log('%s - %s', start, event.summary);
  //     }
  //   }
  //   if(events){ 
  //     callback(events,carryingCallback)
  //   } else {
  //     console.log('Could not retrieve events. Possibly authorization problems. Check your client secret')
  //     return ;
  //   }
  // });
  //   temporary standin while API acess broken
    callback("events go here",carryingCallback)
}

// using an events object, updates the locally stored data in a JSON text file
function updateLocalData (events,carryingCallback) {
  // compare the event data to the current data
  // If the UIID exists, check for changed
  // if it doesn't add it to the appropiate list
  // if an event is missing that was present before, delete it from the local data
  carryingCallback()
}


// TODO TODO TODO TODO TODO


// Syncs the calender events for sprint day + 7 with the local Copy of the events
module.exports.syncCalendar = function syncCalendar( carryingCallback ) {

  // the current date - starting at the very begginning of the day
  var startDate = new Date()
  startDate.setHours(0,0,0,0)

  var endDate = new Date()
  // calculate a date a week from now

  var newDate = endDate.getDate() + 7
  var curMonth = endDate.getMonth()
  if( newDate > (28 + 1) ){
    if( curMonth = 1 ){
      endDate.setMonth( curMonth + 1 ) 
      endDate.setDate( newDate - (28-1) )
    }
  }
  if( newDate > (30 - 1) ){
    if( [3,5,8,10].filter( (n) => { n === curMonth }).length != 0 ){
      endDate.setMonth( curMonth + 1 )
      endDate.setDate( newDate - (30-1) )
    }
  }
  if( newDate > (31 - 1) ){
    if( [0,2,4,6,7,9,11].filter( (n) => { n === curMonth }).length != 0 ){
      endDate.setMonth( curMonth + 1 ) 
      endDate.setDate( newDate - (31-1) )
    }
  }

  if( endDate.getMonth() > 11 ){
    endDate.setMonth(0)
  }

  endDate.setHours(23,59,59,999)

  getEventsForTimeSpan( startDate, endDate, updateLocalData, carryingCallback )

}


