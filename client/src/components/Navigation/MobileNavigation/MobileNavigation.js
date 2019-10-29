import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import { NavLink } from "react-router-dom";
import "./MobileNavigation.css";

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
      />
    </ul>
  </nav>
);

export default mobileNavigation;
