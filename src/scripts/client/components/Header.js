define(['react','socket','components/Menu'],function(React,socket,Menu){
    return class Header extends React.Component {
        constructor(props){
            super(props)
            this.props = props  
        }   
        
        render(){
            return  React.createElement("div", {className: "header"}, 
                        React.createElement("h1", {className: "title"}, this.props.content),
                        React.createElement(Menu, null)
                    ) 
        }



    }
})
