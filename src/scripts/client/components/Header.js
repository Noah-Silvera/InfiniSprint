define(['react','socket'],function(React,socket){
    return class Header extends React.Component {
        constructor(props){
            super(props)
            this.props = props  
        }   
        
        render(){
            return (  React.createElement("div", {className: "header"}, 
                        React.createElement("h1", {className: "title"}, this.props.content), 
                        React.createElement("button", {className: "refreshButton", onClick: this.refreshButton})
                    ) );
        }

        refreshButton(e){
            console.log('asking for events...')
            socket.emit.refreshData()

            e.preventDefault()
            e.stopPropagation()
        }
    }
})
