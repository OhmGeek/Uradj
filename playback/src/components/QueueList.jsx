import React from "react";

class QueueList extends React.Component {
    render() {
        return (
            <div className="w3-container">
                <h2>Up Next:</h2>
                <ul className="w3-ul" id="up-next-list">
                    {this.props.queue.map((song) => {
                        return (<li>
                            <img src={song.info.thumbnail_img} className="w3-bar-item w3-circle" />
                            <div className="w3-bar-item">
                                <span className="w3-large">{song.info.name}</span>
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
}

export default QueueList;