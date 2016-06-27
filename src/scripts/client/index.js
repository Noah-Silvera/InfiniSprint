
// set up requirejs to load external API's ( specifically, react )
requirejs.config({
    paths: {
      "socket-io": "http://localhost:80/socket.io/socket.io",
      "jQuery": 'https://code.jquery.com/jquery-3.0.0.min',
      'google-api': 'https://apis.google.com/js/client.js?onload=define'
    },
    shim:{
        'socket-io' : {
            exports: ['io']
        },
        'jQuery': {
            exports: ['$']
        }
    }
});

var require = requirejs


require(['./react','./react_dom','./google-api','./google_auth','./components/Frame'], function(React,ReactDOM,googleApi,googleAuth,Frame) {



            // hand control of the DOM over to react
            ReactDOM.render(
                   React.createElement(Frame,null), document.getElementById('root')
            )
});










