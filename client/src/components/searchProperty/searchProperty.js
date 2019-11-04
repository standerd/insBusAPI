import React from "react";
import SearchBox from "../googleSearch/newSearch";
import { Link } from "react-router-dom";
import "./searchProperty.css";

// Search Property is the sidedrawer on the left of the screen during the user being allowed
// to search, it handles the dates, location and guest count

const searchProperty = props => {
  let days;
  let today = new Date();
  let checkIn = new Date(props.dateIn);
  let checkOutLimitMonth = checkIn.getMonth() + 1;
  let checkInLimitMonth = today.getMonth() + 1;
  let checkInLimit;
  let checkOutLimit;
  let links;

  // calculation of the number of nights for the booking.
  props.dateOut === "" || props.dateIn === ""
    ? (days = "0")
    : (days =
        (new Date(props.dateOut).getTime() - new Date(props.dateIn).getTime()) /
        (1000 * 3600 * 24));

  // In order to restrict the selection of past dates and to not have negative booking days
  // the html input calendar is restricted.

  //first check if the months are single digits, if so a leading zero is added. and the date
  // is contructed in the format expected by the HTML input calendar.
  checkInLimitMonth < 10
    ? (checkInLimit =
        today.getFullYear() + "-0" + checkInLimitMonth + "-" + today.getDate())
    : (checkInLimit =
        today.getFullYear() + "-" + checkInLimitMonth + "-" + today.getDate());

  checkOutLimitMonth < 10
    ? (checkOutLimit =
        checkIn.getFullYear() +
        "-0" +
        checkOutLimitMonth +
        "-" +
        (checkIn.getDate() + 1))
    : (checkOutLimit =
        checkIn.getFullYear() +
        "-" +
        checkOutLimitMonth +
        "-" +
        (checkIn.getDate() + 1));

  //check the current user type and set the links to change the user type accodingly.
  if (props.type === "user") {
    links = (
      <div className="otherLogin">
        <h4>Other Login</h4>
        <Link id="entity" onClick={props.typeUpdate} to="/loginProperty">
          Entity Login
        </Link>
        <Link id="admin" onClick={props.typeUpdate} to="/">
          Admin Login
        </Link>
      </div>
    );
  } else if (props.type === "entity") {
    links = (
      <div className="otherLogin">
        <h4>Other Login</h4>
        <Link id="user" onClick={props.typeUpdate} to="/loginUser">
          User Login
        </Link>
        <Link id="admin" onClick={props.typeUpdate} to="/">
          Admin Login
        </Link>
      </div>
    );
  } else {
    links = (
      <div className="otherLogin">
        <h4>Other Login</h4>
        <Link id="entity" onClick={props.typeUpdate} to="/loginProperty">
          Entity Login
        </Link>
        <Link id="user" onClick={props.typeUpdate} to="/loginUser">
          User Login
        </Link>
      </div>
    );
  }

  return (
    // the change handler is called from the landing page component
    <div className="searchProperty">
      <div className="form">
        <form onSubmit={props.searchSubmit}>
          <h3>Search Properties</h3>
          <div className="searchBox">
            <SearchBox
              handleChange={props.handleChange}
              address={props.city}
              handleSelect={props.handleSelect}
            />
          </div>
          <br></br>
          <label>Check In Date</label>
          <input
            type="date"
            name="in"
            value={props.dateIn}
            onChange={props.changeHandler("dateIn")}
            min={checkInLimit.toString()}
            required
          />
          <label>Check Out Date </label>
          <input
            type="date"
            name="out"
            value={props.dateOut}
            onChange={props.changeHandler("dateOut")}
            min={checkOutLimit.toString()}
            required
          />

          <label>No of Nights </label>
          <p>{days}</p>
          <label>No of Travellers </label>
          <input
            onChange={props.changeHandler("noOfGuests")}
            type="number"
            min="1"
            value={props.noOfGuests}
            required
          ></input>
          <button type="submit">Submit Search</button>
        </form>
        <h4 style={{ color: "red" }}>
          {props.valid ? "" : "Please Select City"}
        </h4>

        {links}
      </div>
    </div>
  );
};

export default searchProperty;
