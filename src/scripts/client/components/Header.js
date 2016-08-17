define(['react','socket','components/simple/signoutButton'],function(React,socket,signoutButton){
    return class Header extends React.Component {
        constructor(props){
            super(props)
            this.props = props  
        }   
        
        render(){
            return  React.createElement("div", {className: "header"}, 

                        React.createElement("h1", {className: "title"}, this.props.content)
                    ) 
        }



    }
})
