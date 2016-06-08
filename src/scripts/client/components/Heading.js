define(['react'],function(React){
    
    return class Heading extends React.Component {
        render(){
            return (<div className = "heading">
                        <h3 className = "title">{this.props.content}</h3>
                    </div>  );
        }
    }
})
