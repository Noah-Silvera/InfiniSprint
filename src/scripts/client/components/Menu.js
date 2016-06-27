define(['react','google_auth','socket'],function(React,googleAuth,socket){

    var retrieveDataMes = 'Retrieve Events'
    var retrieveAuthMes = 'Authorize google calendar'

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
                        React.createElement('button', { className : 'menuButton',
                                                        id: 'retrieveAuthButton',
                                                        onClick: this.retrieveAuth},
                                                retrieveAuthMes)
                    )
        }

        refreshButton(e){
            console.log('asking for events...')
            socket.emit.refreshData()

            e.preventDefault()
            e.stopPropagation()
        }

        retrieveAuth(e){
            console.log("retrieving google authorization")

            googleAuth.checkAuth().then(function(mes){
                console.log(mes)
            },function(err){
                throw err
            })


            
        }



    }
})