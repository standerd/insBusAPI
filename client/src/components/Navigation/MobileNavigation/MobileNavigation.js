import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import { NavLink } from "react-router-dom";
import "./MobileNavigation.css";

//sets the items to show in the mobile navgation window on open. based on user type and state.
const mobileNavigation = props => (
  <nav className={["mobile-nav", props.open ? "open" : ""].join(" ")}>
    <ul
      className={["mobile-nav__items", props.mobile ? "mobile" : ""].join(" ")}
    >
      <li
        key={"home"}
        className={["navigation-item", props.mobile ? "mobile" : ""].join(" ")}
      >
        <NavLink to={"/"} exact onClick={props.onChooseItem}>
          Home
        </NavLink>
      </li>
      <NavigationItems
        mobile
        onChoose={props.onChooseItem}
        isAuth={props.isAuth}
        onLogout={props.onLogout}
        type={props.type}
      />
    </ul>
  </nav>
);

export default mobileNavigation;
