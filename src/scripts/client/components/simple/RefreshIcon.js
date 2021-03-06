define(['react','google_api','jquery'], function (React,googleApi,jquery) {

    return class signoutButton extends React.Component {
        constructor(props) {
            super(props);
            this.state = { 
                spinning: false
            }
        }
        
        

        render() {

            if( googleApi.isSignedIn() ){

                return React.createElement('img', 
                            { 
                                className: 'icon refreshIcon',
                                src: 'icons/refresh.png',
                                onClick: () => {
                                    this.setState( { spinning: true })

                                    this.props.task().then( (res) => {
                                        console.info(res)
                                        this.setState( { spinning: false } )
                                    }).catch( (err) => {
                                        console.error(err)
                                        // keep spinnning
                                        this.setState( { spinning: true } )
                                    })
                                },
                                ref: (el) => {
                                    if(el != null){
                                        var target = $(el)
                                        if( this.state.spinning ){
                                            target.addClass('fastSpin')
                                        } else {
                                            target.removeClass('fastSpin')
                                        }
                                    }
                                }
                            }
                        )
            } else {
                return null
            }

        }
    };
}); 