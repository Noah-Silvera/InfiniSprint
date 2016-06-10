"use strict";

// set up requirejs to load external API's ( specifically, react )        
requirejs.config({
    paths: {
        "react": 'https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react',
        "react-dom": 'http://cdn.bootcss.com/react/0.14.7/react-dom',
        "socket-io": "http://localhost:80/socket.io/socket.io",
        "google-api": "https://apis.google.com/js/platform",
        "jQuery": 'https://code.jquery.com/jquery-3.0.0.min.js'
    },
    shim: {
        'react-dom': {
            exports: 'ReactDOM',
            deps: ['react']
        },
        'react': {
            exports: ['React', 'Component']
        },
        'socket-io': {
            exports: ['io']
        },
        'google-api': {
            exports: ['gapi']
        },
        'jQuery': {
            exports: ['$']
        }
    }
});

var _require = requirejs;

_require(['react', 'react-dom', './components/Frame'], function (React, ReactDOM, Frame) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    // hand control of the DOM over to react
    ReactDOM.render(React.createElement(Frame, null), document.getElementById('root'));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxVQUFVLE1BQVYsQ0FBaUI7QUFDYixXQUFPO0FBQ0wsaUJBQVMsMkRBREo7QUFFTCxxQkFBYSwrQ0FGUjtBQUdMLHFCQUFhLHlDQUhSO0FBSUwsc0JBQWMscUNBSlQ7QUFLTCxrQkFBVTtBQUxMLEtBRE07QUFRYixVQUFLO0FBQ0QscUJBQWE7QUFDVCxxQkFBUyxVQURBO0FBRVQsa0JBQU0sQ0FBQyxPQUFEO0FBRkcsU0FEWjtBQUtELGlCQUFTO0FBQ0wscUJBQVMsQ0FBQyxPQUFELEVBQVMsV0FBVDtBQURKLFNBTFI7QUFRRCxxQkFBYztBQUNWLHFCQUFTLENBQUMsSUFBRDtBQURDLFNBUmI7QUFXRCxzQkFBZTtBQUNYLHFCQUFTLENBQUMsTUFBRDtBQURFLFNBWGQ7QUFjRCxrQkFBVTtBQUNOLHFCQUFTLENBQUMsR0FBRDtBQURIO0FBZFQ7QUFSUSxDQUFqQjs7QUE0QkEsSUFBSSxXQUFVLFNBQWQ7O0FBR0EsU0FBUSxDQUFDLE9BQUQsRUFBUyxXQUFULEVBQXFCLG9CQUFyQixDQUFSLEVBQW9ELFVBQVMsS0FBVCxFQUFlLFFBQWYsRUFBd0IsS0FBeEIsRUFBK0I7Ozs7Ozs7QUFTL0UsYUFBUyxNQUFULENBQ1Esb0JBQUMsS0FBRCxPQURSLEVBQ2tCLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQURsQjtBQUlILENBYkQiLCJmaWxlIjoiY2xpZW50L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8vIHNldCB1cCByZXF1aXJlanMgdG8gbG9hZCBleHRlcm5hbCBBUEkncyAoIHNwZWNpZmljYWxseSwgcmVhY3QgKSAgICAgICAgIFxyXG5yZXF1aXJlanMuY29uZmlnKHtcclxuICAgIHBhdGhzOiB7XHJcbiAgICAgIFwicmVhY3RcIjogJ2h0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3JlYWN0LzE1LjEuMC9yZWFjdCcsXHJcbiAgICAgIFwicmVhY3QtZG9tXCI6ICdodHRwOi8vY2RuLmJvb3Rjc3MuY29tL3JlYWN0LzAuMTQuNy9yZWFjdC1kb20nLFxyXG4gICAgICBcInNvY2tldC1pb1wiOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODAvc29ja2V0LmlvL3NvY2tldC5pb1wiLFxyXG4gICAgICBcImdvb2dsZS1hcGlcIjogXCJodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9wbGF0Zm9ybVwiLFxyXG4gICAgICBcImpRdWVyeVwiOiAnaHR0cHM6Ly9jb2RlLmpxdWVyeS5jb20vanF1ZXJ5LTMuMC4wLm1pbi5qcydcclxuICAgIH0sXHJcbiAgICBzaGltOntcclxuICAgICAgICAncmVhY3QtZG9tJzoge1xyXG4gICAgICAgICAgICBleHBvcnRzOiAnUmVhY3RET00nLFxyXG4gICAgICAgICAgICBkZXBzOiBbJ3JlYWN0J11cclxuICAgICAgICB9LFxyXG4gICAgICAgICdyZWFjdCc6IHtcclxuICAgICAgICAgICAgZXhwb3J0czogWydSZWFjdCcsJ0NvbXBvbmVudCddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnc29ja2V0LWlvJyA6IHtcclxuICAgICAgICAgICAgZXhwb3J0czogWydpbyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnZ29vZ2xlLWFwaScgOiB7XHJcbiAgICAgICAgICAgIGV4cG9ydHM6IFsnZ2FwaSddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnalF1ZXJ5Jzoge1xyXG4gICAgICAgICAgICBleHBvcnRzOiBbJyQnXVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgcmVxdWlyZSA9IHJlcXVpcmVqc1xyXG5cclxuXHJcbnJlcXVpcmUoWydyZWFjdCcsJ3JlYWN0LWRvbScsJy4vY29tcG9uZW50cy9GcmFtZSddLCBmdW5jdGlvbihSZWFjdCxSZWFjdERPTSxGcmFtZSkge1xyXG4gICAgLy9UaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHNjcmlwdHMvaGVscGVyL3V0aWwuanMgaXMgbG9hZGVkLlxyXG4gICAgLy9JZiB1dGlsLmpzIGNhbGxzIGRlZmluZSgpLCB0aGVuIHRoaXMgZnVuY3Rpb24gaXMgbm90IGZpcmVkIHVudGlsXHJcbiAgICAvL3V0aWwncyBkZXBlbmRlbmNpZXMgaGF2ZSBsb2FkZWQsIGFuZCB0aGUgdXRpbCBhcmd1bWVudCB3aWxsIGhvbGRcclxuICAgIC8vdGhlIG1vZHVsZSB2YWx1ZSBmb3IgXCJoZWxwZXIvdXRpbFwiLlxyXG4gICAgXHJcblxyXG5cclxuICAgIC8vIGhhbmQgY29udHJvbCBvZiB0aGUgRE9NIG92ZXIgdG8gcmVhY3QgXHJcbiAgICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgICAgIDxGcmFtZS8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXHJcbiAgICApXHJcbiAgICBcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
