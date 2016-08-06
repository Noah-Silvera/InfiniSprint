define(['react','socket'],function(React,googleAuth,socket){

    var retrieveDataMes = 'Retrieve Events'
    var retrieveAuthMes = 'Sign In'
    var removeAuthMes = 'Sign Out'

    return class Menu extends React.Component {
        constructor(props){
            super(props)
        }

        render() {
            return  React.createElement('div', { className: 'menu',
                                                id: 'headerMenu' },
                        React.createElement("button", { className: "menuButton",
                                                        id: 'refreshButton',
                                                        onClick: this.refreshButton,
                                                        },
                                                retrieveDataMes),
                        React.createElement('button',   { 
                                                            className : 'menuButton',
                                                            id: 'signin-button'
                                                        },
                                                retrieveAuthMes),
                        React.createElement('button',   {
                                                            className : 'menuButton',
                                                            id: 'signout-button'
                                                        },
                                                removeAuthMes)
                    )
        }

        refreshButton(e){
            console.log('asking for events...')
            socket.emit.refreshData()

            e.preventDefault()
            e.stopPropagation()
        }




    }
})