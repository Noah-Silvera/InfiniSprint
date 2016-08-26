

define(['react',
        'react_dom',
        'moment',
        'components/ActionList',
        'components/Header',
        'components/Heading',
        'components/Spinner',
        'components/simple/signinButton',
        'components/simple/signoutButton',
        'components/Menu',
        ], function (React, ReactDOM, Moment, ActionList, Header, Heading, Spinner,signinButton,signoutButton, Menu) {

    // This frame represents the main
    // component of the app - the frame that renders the backlog and sprint items
    // STATE
    // * This component holds the state of the backlog and sprint lists
    // * allowing you to drag between lists easily by keeping track of both.
    // PROPS
    return class Frame extends React.Component {
        constructor(props) {
            super(props);


            // Pull the google calender item's from the server, process them and use them as our state ( test data for now )
            // State should be of the following form
            // { "backlog" : [
            //      {
            //        "content": "have a great life",
            //        "dataId": 0,
            //        "rank": 1
            //      }, ...
            //    ],
            //  "sprint" : [
            //        {
            //          "content": "Love Everyone",
            //          "dataId": 2,
            //          "rank": 1
            //        }, ...
            //      ]
            //    }
            // }
            // Every list of google cal tasks should have unique rank within that list
            // but every single task must have a unique dataID
            this.data = { "backlog": [{
                    "content": "have a great life",
                    "dataId": 0,
                    "rank": 1
                }, {
                    "content": "have fun",
                    "dataId": 1,
                    "rank": 2
                }, {
                    "content": "eat bread",
                    "dataId": 2,
                    "rank": 3
                }, {
                    "content": "play games",
                    "dataId": 3,
                    "rank": 4
                }, {
                    "content": "be happy",
                    "dataId": 4,
                    "rank": 5
                }],
                "sprint": [{
                    "content": "Do things",
                    "dataId": 5,
                    "rank": 1
                }, {
                    "content": "get money",
                    "dataId": 6,
                    "rank": 2
                }]
            };
        }




        // Renders the frame for the backlog and action items using ActionLists and headings
        // binds the dragging event
        render() {

            // the main body of content to be loaded in the frame
            var content = null;

            if( !this.props.apiReady ){
                // present a loading screen 
                content = [
                    React.createElement(Spinner, {
                       message: 'Loading google calendar component' 
                    })
                ]

            }
            else if( !this.props.signedIn ){
                // api is ready but user not signed in
                content = React.createElement(signinButton)

            } else {

                // load the users data
                content = [
                    React.createElement(Heading, { content: 'Today' }), 
                    React.createElement(ActionList, {
                        date: new Moment().subtract(3,'days') }), 
                    React.createElement(Heading, { content: 'Tommorow' }), 
                    React.createElement(ActionList, {
                        date: new Moment().subtract(2,'days') }), 
                    React.createElement(Heading, { content: 'The next day' }), 
                    React.createElement(ActionList, {
                        date: new Moment().subtract(1,'days') }), 
                ]
            }

            return React.createElement('div', { className: 'frame' }, 
                React.createElement(Menu, {
                    items: [ 
                        React.createElement(signoutButton)
                    ]
                }),
                React.createElement(Header, {   content: 'InfiniSprint',
                                                socket: this.socket }),
                content
            )

        }
    };
});