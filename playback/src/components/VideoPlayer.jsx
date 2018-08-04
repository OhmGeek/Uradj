import React from "react";
import Plyr from "react-plyr";
import "plyr/dist/plyr.css";

function getVideoPlayer(song, onEndOfSong) {
    if(typeof(song.info) !== 'undefined') {
        return <Plyr autoplay provider={song.backend} videoId={song.info.id} onEnd={onEndOfSong}/>
    } else {
        return <div></div>
    }
}
class VideoPlayer extends React.Component {
  
    render() {
       
        console.log(this.props.song);
        return (
            <div className="w3-container w3-black w3-center">
                {getVideoPlayer(this.props.song, this.props.nextSongHandler)}
            </div>

        )
    }
}

export default VideoPlayer;