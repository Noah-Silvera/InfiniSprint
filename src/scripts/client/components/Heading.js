define(['react'], function (React) {

    return class Heading extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {

            return React.createElement("div", { className: "heading" }, React.createElement("h3", { className: "title" }, this.props.content));
        }
    };
});