define(['react'], function (React) {
    return class Header extends React.Component {
        constructor(props) {
            super(props);

            this.render = () => {
                return React.createElement(
                    "div",
                    { className: "header" },
                    React.createElement(
                        "h1",
                        { className: "title" },
                        this.props.content
                    ),
                    React.createElement("button", { className: "refreshButton", onClick: this.refreshButton })
                );
            };

            this.refreshButton = e => {
                console.log('asking for events...');
                this.props.socket.emit('refreshData');

                e.preventDefault();
                e.stopPropagation();
            };

            this.props = props;
        }

    };
});
//# sourceMappingURL=../../dest/maps/client/components/Header.js.map
