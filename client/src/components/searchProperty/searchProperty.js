import React from "react";
import AutoComplete from "../googleSearch/googleSearch";
import "./searchProperty.css";

const searchProperty = props => {
  let days;

  props.dateOut === "" || props.dateIn === ""
    ? (days = "0")
    : (days =
        (new Date(props.dateOut).getTime() - new Date(props.dateIn).getTime()) /
        (1000 * 3600 * 24));

  return (
    <div className="searchProperty">
      <div className="form">
        <h3>Please Search Below</h3>
        <label>Destination </label>
        <AutoComplete
          handleChange={props.handleChange}
          address={props.city}
          handleSelect={props.handleSelect}
        />
        <label>Check In Date</label>
        <input onChange={props.changeHandler("dateIn")} type="date"></input>
        <label>Check Out Date </label>
        <input onChange={props.changeHandler("dateOut")} type="date"></input>
        <label>No of Nights </label>
        <p>{days}</p>
        <label>No of Travellers </label>
        <input
          onChange={props.changeHandler("noOfGuests")}
          type="number"
        ></input>
        <button type="submit">Submit Search</button>
      </div>
    </div>
  );
};

export default searchProperty;
