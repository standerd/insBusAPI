import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

//basic navbar for testing routing at the moment. to be redone.
const navBar = () => (
  <div className="navbar">
    <ul className="alignLeft">
      <li>
        <Link to="/">LOGO</Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/userBookings">My Bookings</Link>
      </li>
      <li>
        <Link to="/userReg">Register User</Link>
      </li>
      <li>
        <Link to="addProperty">Entity Register</Link>
      </li>
      <li>
        <Link to="/maintain">Entity Maintain</Link>
      </li>
      <li>
        <Link to="/userLogin">User Login</Link>
      </li>
    </ul>
  </div>
);

export default navBar;
