define(['react','jquery'], function (React,$) {

    // this class renders an action item
    // It is a draggable class, but does not handle drags itself
    // STATELESS
    // PROPS
    // * rank - key for sorting order
    // * Content - Content of div
    // * data-id - unique ID for handling drag events7

    
    return class Action extends React.Component {

        constructor(props) {
            super(props)
            this.state = { input: false}
        }

        makeEditable(state){
            this.setState( { input: state } )
        }

        render() {
            return React.createElement("div", {
                className: "action",
                "data-id": this.props.dataId 
            }, 
                React.createElement("div", {
                     className: "row",
                     onClick: (e) => {
                         var target = $(e.target)
                         if( target.hasClass('actionText') ){
                             // user clicked on the text
                             this.makeEditable(true)
                         } else if( target.hasClass('actionInput') ){
                             //user clicked on the input box
                             //do nothing
                         } else {
                             //user clicked outside to stop input
                             this.makeEditable(false)
                         }
                     }
                }, (() => {
                    if( this.state.input ){
                        return React.createElement("input",{
                            className: 'actionInput',
                            type: 'text',
                            value: this.props.content
                        })
                    } else {
                        return React.createElement('p', {
                            className: 'selectable actionText'
                        } , this.props.content )
                    }
                })())
            );
        }
    };
});