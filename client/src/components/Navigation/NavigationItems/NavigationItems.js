import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navItems = [
  { id: "bookings", text: "Bookings", link: "/userBookings", auth: true },
  { id: "login", text: "Login", link: "/loginUser", auth: false },
  { id: "signup", text: "Register", link: "/regUser", auth: false }
];

const navigationItems = props => [
  ...navItems
    .filter(item => item.auth === props.isAuth)
    .map(item => (
      <li
        key={item.id}
        className={["navigation-item", props.mobile ? "mobile" : ""].join(" ")}
      >
        <NavLink to={item.link} exact onClick={props.onChoose}>
          {item.text}
        </NavLink>
      </li>
    )),
  props.isAuth && (
    <li
      className={["navigation-item", props.mobile ? "mobile" : ""].join(" ")}
      key="logout"
    >
      <button onClick={props.onLogout}>Logout</button>
    </li>
  )
];

export default navigationItems;
