import React from "react";
import SearchList from "./SearchList.jsx";
import io from "socket.io-client";
class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: []
        }

        this.handleAddToQueue = this.handleAddToQueue.bind(this);
        this.handleTextEntry = this.handleTextEntry.bind(this);
    }

    componentDidMount() {
        this.socket = io();

        this.socket.on('search-result', (searchResults) => {
            console.log("SEARCH RESULTS RETURNED");
            console.log(searchResults);
            this.setState({results: searchResults});
        });

    }
    handleTextEntry(event) {
        event.preventDefault();

        let query = event.target.value;

        this.setState({query: event.target.value});
        // Now carry out the search by sending the event.
        this.socket.emit('search', {q: this.state.query});
    }
    handleAddToQueue(e, data) {
        // Add the song selected.
        this.socket.emit('addSong', data);
    }
    render() {
        return (
            <div>
                <form action="none" className="w3-padding-16 w3-container w3-grey" onSubmit={(e) => e.preventDefault()} >
                    <input className="w3-input w3-border w3-round" type="text" placeholder="Search for a song..." onChange={this.handleTextEntry}></input>
                </form>
                <div className="w3-container">
                    <SearchList results={this.state.results} addHandler={this.handleAddToQueue}/> 
                </div>
            </div>
        )
    }
}

export default SearchPage;