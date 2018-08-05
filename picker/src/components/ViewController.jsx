import React from "react";
import Navbar from "./Navbar.jsx";
class ViewController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: this.props.children[0]
        }
        this.setActiveView = this.setActiveView.bind(this);
    }
    setActiveView(view) {
        console.log(view);
        this.setState({currentView: view});
    }
    render() {
        return (
            <div>
                <div className="w3-container w3-center w3-teal">
                    <h1>{this.state.currentView.props.title}</h1>
                </div>
                {this.state.currentView}
                <Navbar pages={this.props.children} handleClick={this.setActiveView}/>
            </div>
        )        
    }
}

export default ViewController;