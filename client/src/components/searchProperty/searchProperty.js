import React from "react";
import SearchBox from "../googleSearch/newSearch";
import "./searchProperty.css";

const searchProperty = props => {
  let days;
  let today =  new Date();
  let checkOutLimitMonth = today.getMonth() + 1;
  let checkInLimitMonth = today.getMonth() + 1;
  let checkInLimit;
  let checkOutLimit;

  props.dateOut === "" || props.dateIn === ""
    ? (days = "0")
    : (days =
        (new Date(props.dateOut).getTime() - new Date(props.dateIn).getTime()) /
        (1000 * 3600 * 24));


  checkInLimitMonth < 10 ? checkInLimit = today.getFullYear() + "-0" + checkInLimitMonth + "-" + today.getDate() : checkInLimit = today.getFullYear() + "-" + checkInLimitMonth + "-" + today.getDate()

  checkOutLimitMonth < 10 ? checkOutLimit = today.getFullYear() + "-0" + checkOutLimitMonth + "-" + (today.getDate()+1) : checkOutLimit = today.getFullYear() + "-" + checkOutLimitMonth + "-" + (today.getDate() +1)

  console.log(checkInLimit)

  return (
    <div className="searchProperty">
      <div className="form">
        <h3>Please Search Below</h3>
        <div className="searchBox">
          <SearchBox
            handleChange={props.handleChange}
            address={props.city}
            handleSelect={props.handleSelect}
          />
        </div>

        <br></br>
        <label>Check In Date</label>
        <input onChange={props.changeHandler("dateIn")} type="date" name="in" min={checkInLimit.toString()}></input>
        <label>Check Out Date </label>
        <input onChange={props.changeHandler("dateOut")}  type="date" name="out" min={checkOutLimit.toString()}></input>
        <label>No of Nights </label>
        <p>{days}</p>
        <label>No of Travellers </label>
        <input
          onChange={props.changeHandler("noOfGuests")}
          type="number"
          min="1"
        ></input>
        <button onClick={props.searchSubmit} type="submit">
          Submit Search
        </button>
      </div>
    </div>
  );
};

export default searchProperty;
