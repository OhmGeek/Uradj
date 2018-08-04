// import React from "react";
// import plyr from "plyr";
// import styles from "plyr/dist/plyr.css";
// import ReactDOM from "react-dom";

// class PlyrComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.plyrObject = React.createRef();
//         this.state = {
//             player: null,
//             currentSong: this.props.source
//         }
//     }
//     componentDidMount() {
//         let players = plyr.setup(this.plyrObject, this.props.options);
//         console.log(players);
//         player.source = this.props.source;
//         this.setState({player: player})

//     }
 
//     render() {
//         return (
//             <div ref={this.plyrRef} className='js-plyr plyr'>
//             </div>
//         )
//     }
// }

// export default PlyrComponent;