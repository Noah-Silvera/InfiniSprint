
// set up requirejs to load external API's
requirejs.config({
    paths: {
      "socket-io": "http://localhost:80/socket.io/socket.io",
      "jQuery": 'https://code.jquery.com/jquery-3.0.0.min',
      'spin': './spin',
      'moment': './moment'
    },
    shim:{
        'socket-io' : {
            exports: ['io']
        },
        'jQuery': {
            exports: ['$']
        },
        'spin' : {
            exports: ['Spinner']
        },
        'moment' : {
            exports: ['moment']
        }

    }
});

var require = requirejs


require(['./react','./react_dom','./components/Frame','google_api'], function(React,ReactDOM,Frame,googleApi) {
            // hand control of the DOM over to react

            // render the frame with a loading status 
            ReactDOM.render(
                React.createElement(Frame, {
                    apiReady: false,
                    signedIn: false
                }),
                document.getElementById('root')
            )

            var updateSignIn = (isSignedIn) => {
                // if the user is sign in, load the data
                if( isSignedIn ){
                    ReactDOM.render(
                        React.createElement(Frame, {
                            apiReady: true,
                            signedIn: true
                        }), document.getElementById('root')
                    )

                } else {
                    // load the sign in button
                    ReactDOM.render(
                        React.createElement(Frame, {
                            apiReady: true,
                            signedIn: false
                        }), document.getElementById('root')
                    )
                }

            }

            googleApi.handleClientLoad().then( () => {
                console.info('ready to work with google API')

                updateSignIn( googleApi.isSignedIn() )

            }, (err) => {
                throw err
            })

            googleApi.listen( (isSignedIn) => {
                
                updateSignIn( isSignedIn )
            })


});










