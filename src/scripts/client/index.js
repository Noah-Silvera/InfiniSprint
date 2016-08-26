
// set up requirejs to load external API's
requirejs.config({
    paths: {
      "jquery": './jquery',
      "jquery-ui": './jquery-ui.min',
      'spin': './spin',
      'moment': './moment'
    },
    shim:{
        'socket-io' : {
            exports: ['io']
        },
        'jquery': {
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


            // initialize the client loading process
            googleApi.handleClientLoad().then( () => {}, (err) => {
                throw err
            })
            
            googleApi.signinCallback( (signedIn) => {
                // if the user is not signed in, present them with the not-signed in state
                if( !signedIn ){
                    ReactDOM.render(
                        React.createElement(Frame, {
                            apiReady: true,
                            signedIn: false
                        }), document.getElementById('root')
                    )
                }
            })

            googleApi.calReadyCallback( () => {
                // once the user has signed in AND The calendar has loaded
                // render the data from the calendar
                ReactDOM.render(
                    React.createElement(Frame, {
                        apiReady: true,
                        signedIn: true
                    }), document.getElementById('root')
                )
            })


});










