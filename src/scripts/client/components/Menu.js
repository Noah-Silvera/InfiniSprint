define(['react','google_api','components/simple/signoutButton'],function(React,googleApi,signoutButton){

    var retrieveDataMes = 'Retrieve Events'
    var retrieveAuthMes = 'Sign In'
    var removeAuthMes = 'Sign Out'

    return class Menu extends React.Component {
        constructor(props){
            super(props)
        }

        render() {



            return  React.createElement('div', 
                        { 
                            className: 'menu',
                            id: 'headerMenu'
                        },
                        this.props.items
                        
                    )
        }


        retrieveEvents(e){
            googleApi.getEvents( new Date() )
        }




    }
})