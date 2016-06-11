define(['react'],function(React){
    return class Header extends React.Component {
        constructor(props){
            super(props)
            this.props = props  
        }   
        
        render = () => {
            return (  <div className = "header">
                        <h1 className = "title">{this.props.content}</h1>
                        <button className="refreshButton" onClick = {this.refreshButton} />
                    </div> );
        }

        refreshButton = (e) => {
            console.log('asking for events...')
            this.props.socket.emit('refreshData')

            e.preventDefault()
            e.stopPropagation()
        }
    }
})
