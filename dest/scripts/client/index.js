"use strict";

// set up requirejs to load external API's ( specifically, react )        
requirejs.config({
    paths: {
        "react": 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react',
        "react-dom": 'http://cdn.bootcss.com/react/0.14.7/react-dom',
        "socket-io": "http://localhost:80/socket.io/socket.io",
        "google-api": "https://apis.google.com/js/platform"
    },
    shim: {
        'react-dom': {
            exports: 'ReactDOM',
            deps: ['react']
        },
        'react': {
            exports: ['React', 'Component']
        }
    }
});

var _require = requirejs;

_require(['react', 'react-dom', 'socket-io', 'google-api', './components/Action'], function (React, ReactDOM, Action) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util". 

    // hand control of the DOM over to react
    ReactDOM.render(React.createElement(
        "div",
        null,
        React.createElement(Action, null)
    ), document.getElementById('root'));
});