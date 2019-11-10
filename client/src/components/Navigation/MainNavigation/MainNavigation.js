import React from "react";
import { NavLink } from "react-router-dom";

import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./MainNavigation.css";

//main navigation feeds the mobile as well as the main navigation header. Items from the
//navigationItems component are rendered based on the user type and state.
const mainNavigation = props => (
  <nav className="main-nav">
    <MobileToggle onOpen={props.onOpenMobileNav} />

    <div className="main-nav__logo">
      <NavLink to="/">
        <Logo />
      </NavLink>
    </div>

    <ul className="main-nav__items">
      <li
        key={"home"}
        className={["navigation-item", props.mobile ? "mobile" : ""].join(" ")}
      >
        <NavLink to={"/"} exact>
          Home
        </NavLink>
      </li>
    </ul>

    <div className="spacer" />
    <ul className="main-nav__items">
      <NavigationItems
        isAuth={props.isAuth}
        type={props.type}
        onLogout={props.onLogout}
      />
    </ul>
  </nav>
);

export default mainNavigation;
