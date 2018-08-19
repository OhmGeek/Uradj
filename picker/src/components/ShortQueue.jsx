import React from "react";
import io from "socket.io-client"
class ShortQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: []
        }
    }
    componentDidMount() {
        let socket = io();

        // Update queue.
        socket.on('queue-updated', (data) => {
            this.setState({queue: data});
        });
    }

    render() {
        let shortQueue = this.state.queue;
        return (
            <ul>
                {shortQueue.map((elem) => {
                    return (
                        <li className="w3-bar">
                            <img src={elem.info.thumbnail_img} className="w3-bar-item w3-circle" style="width: 85px" />
                            <div className="w3-bar-item">
                                <span className="w3-large">{elem.info.name}</span>
                            </div>
                        </li>
                    )
                })}                    
            </ul>
        )
    }

}

export default ShortQueue;