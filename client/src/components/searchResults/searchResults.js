import React from "react";
import "../landingPage/landingPage.css";
import Map from "../maps/map";
import "./searchResults.css";

const searchResults = props => {
  let occupation = [];
  let property;

  let myFirstDate = new Date(props.dateIn);
  let myLastDate = new Date(props.dateOut);
  let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

  for (let i = 0; i < duration; i++) {
    let myDate = myFirstDate.toLocaleDateString();
    occupation.push(myDate);
    myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
  }

  property = props.markerArray.map((key, index) => {
    let isAvailable = false;
    let availableDates = key.availability;

    for (let i = 0; i < occupation.length; i++) {
      if (isAvailable) {
        break;
      }
      isAvailable = availableDates.includes(occupation[i]);
    }

    return (
      <div key={key._id} className="propertyBlock">
        <h1>{key.name}</h1>
        <img
          src={"/images/" + key.images[0]} 
          alt=""
        />
        <h4>{key.entityType}</h4>
        <h5>Main Facilities</h5>
        <p>{key.facilities[0]}</p>
        <p>{key.facilities[1]}</p>
        <p>{key.facilities[2]}</p>
        <p>Available : {!isAvailable ? "Yes" : "No"}</p>
        <button id={index} onClick={props.openModal}>
          View Property
        </button>
      </div>
    );
  });

  return (
    <div>
      <h1 style={{ backgroundColor: "lightGray", marginTop: "0" }}>
        Results For Your Search
      </h1>
      <Map
        style={{ border: "1px solid #ccc", padding: "0.3rem" }}
        markerArray={props.markerArray}
        initialLat={props.initialLat}
        initialLng={props.initialLng}
        zoom={props.zoom}
        selected={props.selected}
        dateIn={props.dateIn}
        dateOut={props.dateOut}
      />
      <div className="propertyRow">{props.amendSearch ? null : property}</div>
    </div>
  );
};

export default searchResults;
