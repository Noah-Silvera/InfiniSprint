
// set up requirejs to load external API's ( specifically, react )
requirejs.config({
    paths: {
      "socket-io": "http://localhost:80/socket.io/socket.io",
      "jQuery": 'https://code.jquery.com/jquery-3.0.0.min'
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


require(['./react','./react_dom','./components/Frame','google_api'], function(React,ReactDOM,Frame,google_api) {
            // hand control of the DOM over to react
            ReactDOM.render(
                   React.createElement(Frame,null), document.getElementById('root')
            )

            
            google_api.handleClientLoad()


});










