import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "./assets/css/style.css";

const originalSetItem = localStorage.setItem;

localStorage.setItem = function(key, value) {
  const event = new Event('itemInserted');

  event.value = value; // Optional..
  event.key = key; // Optional..

  document.dispatchEvent(event);

  originalSetItem.apply(this, arguments);
};

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
