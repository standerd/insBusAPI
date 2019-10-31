import React from "react";
import "../landingPage/landingPage.css";
import Map from "../maps/map";
import "./searchResults.css";

const searchResults = props => {
  let property;
  let button;

  // the user search box only returns a in and out date, all dates in between however needs to
  // checked for availability, the below function sets the full user booking period into an array
  // this is the check in the next function against the enity availability array.
  let occupation = [];
  let myFirstDate = new Date(props.dateIn);
  let myLastDate = new Date(props.dateOut);
  let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

  for (let i = 0; i < duration; i++) {
    let myDate = myFirstDate.toLocaleDateString();
    occupation.push(myDate);
    myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
  }

  // loops through the booking dates array of the users dates comparing it to the
  // availability array received from the database, and then sets availibility of each property
  // returned by the results.
  property = props.markerArray.map((key, index) => {
    let isAvailable = false;
    let availableDates = key.availability;

    for (let i = 0; i < occupation.length; i++) {
      if (isAvailable) {
        break;
      }
      isAvailable = availableDates.includes(occupation[i]);
    }

    //if property is not available the View Property button is disabled to not allow the user to
    // view and book the propery
    isAvailable
      ? (button = null)
      : (button = (
          <button id={index} onClick={props.openModal}>
            View Property
          </button>
        ));

    return (
      <div key={key._id} className="propertyBlock">
        <h1>{key.name}</h1>
        <img src={"/" + key.images[0]} alt="" />
        <h4>{key.entityType}</h4>
        <h5>Main Facilities</h5>
        <p>{key.facilities[0]}</p>
        <p>{key.facilities[1]}</p>
        <p>{key.facilities[2]}</p>
        <p>Available : {!isAvailable ? "Yes" : "No"}</p>
        {button}
      </div>
    );
  });

  return (
    <div>
      <h1
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
          color: "white",
          margin: "0.5%",
          border: "0.8px solid white"
        }}
      >
        Search Results
      </h1>
      <div
        style={{
          border: "1px solid black",
          backgroundColor: "black",
          padding: "0.1rem"
        }}
      >
        <Map
          markerArray={props.markerArray}
          initialLat={props.initialLat}
          initialLng={props.initialLng}
          zoom={props.zoom}
          selected={props.selected}
          dateIn={props.dateIn}
          dateOut={props.dateOut}
        />
      </div>

      {/* if the user ammends the search parameter after the intial search, the search results are set to null again */}
      <div className="propertyRow">{props.amendSearch ? null : property}</div>
    </div>
  );
};

export default searchResults;
