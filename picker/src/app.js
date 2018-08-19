
import ReactDOM from "react-dom";
import React from "react";

import ViewController from "./components/ViewController.jsx";
import HomePage from "./components/HomePage.jsx";
import SearchPage from "./components/SearchPage.jsx";
import QueuePage from "./components/QueuePage.jsx";
import "w3-css";

let appContainer = document.createElement("div")
document.querySelector("body").appendChild(appContainer);

ReactDOM.render((
  <ViewController>
      <HomePage title="Home Page" />
      <SearchPage title="Search" />
      <QueuePage title="Queue" />
  </ViewController>  
), appContainer)

