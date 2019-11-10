import React from "react";

import "./MobileToggle.css";

// handles the mobile hamburger icon and openeing of the mobile nav modal.
const mobileToggle = props => (
  <button className="mobile-toggle" onClick={props.onOpen}>
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
  </button>
);

export default mobileToggle;
