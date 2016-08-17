define(['react','spin'], function (React,spinObj) {

    return class Spinner extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount(){
            // console.log('here')
        }

        render() {
            var spinner = new spinObj({
                className: 'spinner-animation'
            }).spin()

            
            
            return React.createElement("div", 
                {
                    "className": 'spinner-wrapper',
                    "ref": function(el){
                        if( el !== null){
                            // remove the spinner if it exists
                            if( el.childNodes.length === 2 )
                                el.removeChild( el.childNodes[0] )
                            el.appendFirst(spinner.el)
                        }
                    }
                }, React.createElement( 'p', { className:"spinner-mes"}, `${this.props.message}...` )
                );
        }
    };
}); 