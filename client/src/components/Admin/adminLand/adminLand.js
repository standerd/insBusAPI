import React from "react";
import "./adminLand.css";
import { withRouter, Link } from "react-router-dom";

//admin landing showing the 3 options for the admin user.
const adminLand = props => {
  return (
    <div className="adminLand">
      <div className="landOverlay">
        <h1>Welcome Administrator</h1>
        <div className="links">
          <div className="link">
            <Link to="/adminBookings">View All Bookings</Link>
          </div>
          <div className="link">
            <Link to="/adminUsers">View All Users</Link>
          </div>
          <div className="link">
            <Link to="/adminProps">View All Properties</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(adminLand);
