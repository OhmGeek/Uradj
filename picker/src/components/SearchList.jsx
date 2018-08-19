import React from "react";

class SearchList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let shortQueue = this.props.results;
        if(shortQueue.err) {
            return (
                <div className="w3-center">
                    An error occurred while fetching results. :(
                </div>
            )
        }

        const imgStyle = {
            width: '85px'
        }
        return (
            <ul className="w3-ul w3-hoverable">
                {shortQueue.map((elem) => {
                    return (
                        <li className="w3-bar" onClick={(evt) => this.props.addHandler(evt, elem)}>
                            <img src={elem.info.thumbnail_img} className="w3-bar-item w3-circle" style={ imgStyle } />
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

export default SearchList;