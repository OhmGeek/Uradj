import React from "react";
import ShortQueue from "./ShortQueue.jsx";

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div className="w3-card-4">
                    <header className="w3-container w3-light-grey"><h3 className="w3-center">Welcome to Aidan's Jukebox!</h3></header>
                    <article className="w3-container"> 
                        Through the app, you can search for a song (and add it), view the queue,
                        and more! If you have any questions, ask a TechComm member for help/details.
                    </article>
                </div>
                <div className="w3-card-4">
                    <header className="w3-container w3-light-grey"><h3 className="w3-center">Up Next</h3></header>
                    <article>
                        <ShortQueue maxItemsToDisplay={5}/>
                    </article>
                </div>
            </div>
        )
    }
}

export default HomePage;