define(['react'], function (React) {

    return class signinButton extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return React.createElement('div', { className: 'centerWrapper'},
                React.createElement('button', {
                        id:'signin-button',
                        onClick: require('google_api').handleAuthClick,
                    }, 'Sign In')
            )
        }
    };
}); 