define(['react','google_api'], function (React,googleApi) {

    return class signoutButton extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {

            if( googleApi.isSignedIn() ){

                return React.createElement('img', 
                            { 
                                className: 'icon menuButton',
                                src: 'icons/logout_arrow.png',
                                id: 'signout-button',
                                onClick: require('google_api').handleSignoutClick
                            }
                        )
            } else {
                return null
            }

        }
    };
}); 