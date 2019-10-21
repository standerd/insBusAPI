import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { LoadScript } from "@react-google-maps/api";
import KEY from "./config/keys";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <LoadScript
      id="script-loader"
      libraries={["places"]}
      googleMapsApiKey={KEY.mapsKey}
    >
      <App />
    </LoadScript>
  </BrowserRouter>,
  document.getElementById("root")
);
