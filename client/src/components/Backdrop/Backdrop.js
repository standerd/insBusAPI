import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

//backdrop used for the mobile navbar.
const backdrop = props =>
  ReactDOM.createPortal(
    <div
      className={["backdrop", props.open ? "open" : ""].join(" ")}
      onClick={props.onClick}
    />,
    document.getElementById("backdrop-root")
  );

export default backdrop;
