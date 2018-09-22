import React from "react";
import ViewController from "./ViewController.jsx";
import HomePage from "./HomePage.jsx";
import QueuePage from "./QueuePage.jsx";
import SearchPage from "./SearchPage.jsx";
import Alert from "./Alert.jsx";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null
        }
        this.updateAlertState = this.updateAlertState.bind(this);
    }

    updateAlertState(s) {
        let alertObject = null;
        if(s && s.err) {
            alertObject = {
                type: "error",
                title: "Error",
                text: "Error."
            };
        } else if (s && s.confirmed) {
            alertObject = {
                type: "success",
                title: "Song Added",
                text: "Song added successfully."
            }
        } else {
            alertObject = null;
        }
        console.log(alertObject);
        this.setState({alert: alertObject});
    }
    render() {
        
        return (
            <div>
                <ViewController>
                    <HomePage title="Home Page" />
                    <SearchPage title="Search" triggerAlert={this.updateAlertState}/>
                    <QueuePage title="Queue" />
                </ViewController>
                <Alert alert={this.state.alert}/>
            </div>
        )
    }
}