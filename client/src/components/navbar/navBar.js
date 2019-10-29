import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

//basic navbar for testing routing at the moment. to be redone.
const navBar = () => (


  <nav className="main-nav">
    {/* <MobileToggle onOpen={props.onOpenMobileNav} /> */}

    <div className="main-nav__logo">
      <Link to="/">
        <p>Logo</p>
      </Link>
    </div>

    
    <div className="spacer" />
    <ul className="main-nav__items">
    <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/userBookings">Bookings</Link>
      </li>
      <li>
        <Link to="/userReg">Register</Link>
      </li>
      <li>
        <Link to="addProperty">Reg Property</Link>
      </li>
      <li>
        <Link to="/maintain">Profile</Link>
      </li>
    </ul>
  </nav>



  // <div className="navbar">
  //   <ul className="alignLeft">
  //     <li>
  //       <Link to="/">Home</Link>
  //     </li>
  //     <li>
  //       <Link to="/userBookings">Bookings</Link>
  //     </li>
  //     <li>
  //       <Link to="/userReg">Register</Link>
  //     </li>
  //     <li>
  //       <Link to="addProperty">Reg Property</Link>
  //     </li>
  //     <li>
  //       <Link to="/maintain">Profile</Link>
  //     </li>

  //     <li style={{marginLeft: "auto"}}>
  //       <Link to="/userLogin">Login</Link>
  //     </li>
  //   </ul>
  // </div>
);

export default navBar;
