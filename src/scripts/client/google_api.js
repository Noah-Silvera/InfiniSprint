define( function(){
    
    var google_api = {
        'handleClientLoad': handleClientLoad
    }

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
    var auth2; // The Sign-In object.
    var authorizeButton;
    var signoutButton;

    function handleClientLoad() {

        request.get('/keys', function(err,res,body){
            if( err ) throw err

            var keys = JSON.parse(body)

            apiKey = keys.apiKey
            clientId = keys.clientId
            
            authorizeButton = document.getElementById('signin-button');
            signoutButton = document.getElementById('signout-button');
            // Load the API client and auth library
            gapi.load('client:auth2', initAuth);
        })
        
    }

    function initAuth() {
        gapi.client.setApiKey(apiKey);
        gapi.auth2.init({
            client_id: clientId,
            scope: scopes
        }).then(function () {
            auth2 = gapi.auth2.getAuthInstance();
            // Listen for sign-in state changes.
            auth2.isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(auth2.isSignedIn.get());
            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
        });
    }
    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';
            // makeApiCall();
        } else {
            authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';
        }
    }
    function handleAuthClick(event) {
        auth2.signIn();
    }
    function handleSignoutClick(event) {
        auth2.signOut();
    }

    return google_api;

})
