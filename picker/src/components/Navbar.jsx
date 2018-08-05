import React from "react";
import "./Navbar.css";

class Navbar extends React.Component {
    render() {
        return (
        <nav>
            {this.props.pages.map((child) => {

                return (
                    <a onClick={() => this.props.handleClick(child)} active={child.props.active}>
                        {child.props.title}
                    </a>
                )
            })}
        </nav>
        )
    }
}

export default Navbar;