
import ReactDOM from "react-dom";
import React from "react";

import App from "./components/App.jsx";
import "w3-css";
import "sweetalert2/dist/sweetalert2.css";

let appContainer = document.createElement("div")
document.querySelector("body").appendChild(appContainer);

ReactDOM.render((
    <App />
), appContainer)

