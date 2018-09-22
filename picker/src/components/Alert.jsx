import React from "react";
import SweetAlert from "sweetalert2-react";

export default class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        let AlertResults = () => {
            if(this.props.alert && this.props.alert != null) {
                return (
                    <SweetAlert
                        show={true}
                        title={this.props.alert.title}
                        text={this.props.alert.text}
                        type={this.props.alert.type}
                    />
                )
            }
            return <div/>
        }
        return (
            <div>
                <AlertResults />
            </div>
        )
    }

}