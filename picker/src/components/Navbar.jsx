import React from "react";
import "./Navbar.css";

class Navbar extends React.Component {
    render() {
        return (
        <nav>
            {this.props.pages.map((child) => {
                const isActive = this.props.activeView === child
                let activeClass = "";
                if(isActive) {
                    activeClass = "active"
                }

                return (
                    <a onClick={() => this.props.handleClick(child)} className={activeClass}>
                        {child.props.title}
                    </a>
                )
            })}
        </nav>
        )
    }
}

export default Navbar;