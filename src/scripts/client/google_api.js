define( ['moment'], function(Moment){

    var moduleName = 'Google API' // for logging purposes

    var calReadyListeners = []
    var signinListeners = []

    
    var google_api = {
        'handleClientLoad': handleClientLoad,
        'getEvents': getEvents,
        'isSignedIn': isSignedIn,
        'handleAuthClick': handleAuthClick,
        'handleSignoutClick': handleSignoutClick,
        'calReadyCallback':  (listener)=>{
            calReadyListeners.push(listener)
        }, // default value until possible to check if signed in
        'signinCallback': (listener) => {
            signinListeners.push(listener)
        },
        'calId': null,

    }

    // shortcuts 
    var calendar = null;
    var auth2 = null; // The Sign-In object.

    
    // Enter an API key from the Google API Console:
    //   https://console.developers.google.com/apis/credentials?project=_
    var apiKey;
    // Enter a client ID for a web application from the Google API Console:
    //   https://console.developers.google.com/apis/credentials?project=_
    // In your API Console project, add a JavaScript origin that corresponds
    //   to the domain where you will be running the script.
    var clientId;
    // Enter one or more authorization scopes. Refer to the documentation for
    // the API or https://developers.google.com/identity/protocols/googlescopes
    // for details.

    var scopes = 'https://www.googleapis.com/auth/calendar';

    function handleClientLoad() {
        return new Promise((resolve, reject) => {

            console.info(`Loading module: ${moduleName}`)
            
            setUpKeys().then(()=>{
                // load the GAPI client and authorization library
                return new Promise( (resolve,reject) => {
                    gapi.load('client:auth2', () => {
                        resolve()
                    });
                })
            }).then( (res) => {
                return initAuth()
            }).then(()=> {
                // perform the initial sign in work
                auth2 = gapi.auth2.getAuthInstance();

                google_api.listen = auth2.isSignedIn.listen

                // Listen for sign-in state changes.
                auth2.isSignedIn.listen(updateSigninStatus);
  
                // Handle the initial sign-in state.
                return updateSigninStatus(auth2.isSignedIn.get());
                
            }).then( ()=> {
                console.info(`Module loaded: ${moduleName}`)
                resolve()
            }).catch( (err) => {
                if(err.type === 'CALERR'){
                    console.error('A calendar error occured while loading the google API components')
                    console.error(err)
                }

                reject(err)
            });
        });

        // Load the API client and auth library
        
    }

    function setUpKeys(){
        return new Promise((resolve, reject) => {
            
            request.get('/keys', function(err,res,body){
                if( err ) reject(err)

                var keys = JSON.parse(body)

                apiKey = keys.apiKey
                clientId = keys.clientId
                

                resolve()
            })
        });

    }

    function initAuth() {
        return new Promise( (resolve,reject) => {

            gapi.client.setApiKey(apiKey);

            var gAuth = gapi.auth2.init({
                client_id: clientId,
                scope: scopes
            })

            // WEIRD WORKAROUND DO NOT CHANGE TO HAVE THIS FUNCTION JUST RETURN A PROMISE
            gAuth.then( () => {
                resolve()
            }, (err)=>{
                reject(err)
            })
        })
    }

  	function ready( listeners ){
          for(var i=0; i < listeners.length; i++){
              var cb = listeners[i];
              
              cb()

          }
    }

    function updateSigninStatus(isSignedIn) {
        return new Promise( (resolve,reject) => {

            ready( signinListeners)

            if (isSignedIn) {
                // load the calendar API


                calendar = loadCalendar()

                calendar.then( ()=>{

                    ready( calReadyListeners )
                    resolve()
                }, (err) => {
                    reject(err)
                })
                
            } else {

                // reset the cal value to avoid auth errors
                loadCalendar({ 'unload': true }).then( () => {
                    resolve()
                })
            }
        })
    }

    function loadCalendar(options){
        var subModuleName = 'Calendar Module'


        if( options !== undefined && options.unload !== undefined && options.unload === true){
            calendar = null;
            console.info(`${moduleName} sub-module destroyed: ${subModuleName}`)
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {

            // calendar has already been loaded
            if( calendar !== null) resolve()

            gapi.client.load('calendar','v3').then(()=> {
                // set the module scope calendar variable
                calendar = gapi.client.calendar;

                return calendar.calendarList.list()

            }, (err) =>{
                // reset the module scope calendar variable
                loadCalendar({ 'unload': true}).then( () => {
                    console.error('Could not load calendar API')
                    err.type = 'CALERR'
                    reject(err)
                })
                

            }).then((res) =>{
                var cals = JSON.parse(res.body).items

                var primId;
                cals.forEach( (cal) => {
                    if( cal.primary ) primId = cal.id
                })

                google_api.calId = primId
                
                console.info(`${moduleName} sub-module loaded: ${subModuleName}`)
                console.debug(`primary calendar ID ${primId}`)


                resolve()
            }, (err) => {
                console.error('Could not determine primary calendar ID')
                err.type = 'CALERR'
                reject(err)
            });
        }); 
        
    }

    function handleAuthClick(event) {
        auth2.signIn();
    }
    function handleSignoutClick(event) {
        auth2.signOut();
    }

    function isSignedIn(){
        if( auth2 === null) return false;

        return auth2.isSignedIn.get()
    }

    
    function getEvents(day){
        return new Promise((resolve, reject) => {
            console.debug(`retrieving events from ${day}`)
            if( calendar == null ) throw new Error('calendar not loaded')

            Promise.resolve().then( () => {

                if( calendar.then !== undefined || calendar.then !== null){
                   return calendar
                } else {
                    return Promise.resolve()
                }            

            }).then( () => {
                return calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': day.startOf('day').subtract(1,'days').toDate().toISOString(), 
                    'timeMax': day.endOf('day').toDate().toISOString(), 
                    'singleEvents':true // this needs testing
                })
            }).then((res) =>{
                var body = JSON.parse(res.body)

                var events = body.items;

                console.info(`Events for calendar with calId: ${google_api.calId} recieved from google`)
                console.debug(events)

                resolve(events)

            },(err) =>{
                console.error('Bad request for calendar events')
                console.error(err)
            })
            
            
        });
    }

    return google_api;

})
