import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

//navitems are set below and display is based on use type and login state.
const navItems = [
  {
    id: "bookings",
    text: "Bookings",
    link: "/userBookings",
    auth: true,
    type: "user"
  },
  { id: "login", text: "Login", link: "/loginUser", auth: false, type: "user" },
  {
    id: "admBook",
    text: "Bookings",
    link: "/adminBookings",
    auth: true,
    type: "admin"
  },
  {
    id: "admUsers",
    text: "Users",
    link: "/adminUsers",
    auth: true,
    type: "admin"
  },
  {
    id: "admProps",
    text: "Properties",
    link: "/adminProps",
    auth: true,
    type: "admin"
  },
  {
    id: "loginadmin",
    text: "Login",
    link: "/adminLogin",
    auth: false,
    type: "admin"
  },
  {
    id: "signup",
    text: "Register",
    link: "/regUser",
    auth: false,
    type: "user"
  },
  {
    id: "propSignUp",
    text: "Register",
    link: "/addProperty",
    auth: false,
    type: "entity"
  },
  {
    id: "maintain",
    text: "Maintain",
    link: "/maintain",
    auth: true,
    type: "entity"
  },
  {
    id: "propLogin",
    text: "Login",
    link: "/loginProperty",
    auth: false,
    type: "entity"
  }
];

const navigationItems = props => [
  ...navItems
    .filter(item => item.auth === props.isAuth && item.type === props.type)
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
