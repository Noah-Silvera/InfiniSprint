
// set up requirejs to load external API's ( specifically, react )         
requirejs.config({
    paths: {
      "react": 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react',
      "react-dom": 'http://cdn.bootcss.com/react/0.14.7/react-dom',
      "socket-io": "http://localhost:80/socket.io/socket.io",
      "google-api": "https://apis.google.com/js/platform",
    },
    shim:{
        'react-dom': {
            exports: 'ReactDOM',
            deps: ['react']
        },
        'react': {
            exports: ['React','Component']
        },
        'socket-io' : {
            exports: ['io']
        },
        'google-api' : {
            exports: ['gapi']
        }
    }
});

var require = requirejs


require(['react','react-dom','./components/Frame'], function(React,ReactDOM,Frame) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    


    // hand control of the DOM over to react 
    ReactDOM.render(
            <Frame/>, document.getElementById('root')
    )
    
});










