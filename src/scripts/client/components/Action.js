define(['react'],function(React){

    // this class renders an action item
    // It is a draggable class, but does not handle drags itself
    // STATELESS
    // PROPS
    // * rank - key for sorting order
    // * Content - Content of div
    // * data-id - unique ID for handling drag events
    return ( 
        class Action extends React.Component {

            render() {
                return (<div className = "action" draggable = "true" data-id = {this.props.dataId} >
                                <p className = "row">{this.props.rank}    </p><p className = "row">{this.props.content}</p>
                        </div>)

            }
        }
    )
})