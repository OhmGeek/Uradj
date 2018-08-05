import React from "react";

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <ons-card>
                    <div className="title"> Welcome to Aidan's Jukebox!</div>
                    <div className="content"> 
                        Through the app, you can search for a song (and add it), view the queue,
                        and more! If you have any questions, ask a TechComm member for help/details.
                    </div>
                </ons-card>
            </div>
        )
    }
}

export default HomePage;