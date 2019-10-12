import React, { Component } from "react";
import "./landingPage.css";
import SearchProperty from "../searchProperty/searchProperty";
import Map from "../maps/map";

class LandingPage extends Component {
  state = {
    dateIn: "",
    dateOut: "",
    noOfGuests: "",
    city: "",
    lat: "",
    zoomLevel: 3,
    lng: "",
    searchArray: [],
    searching: false,
    initialLat: -29.27076,
    initialLng: 25.112268,
    zoom: 5,
    selected: false
  };

  changeHandler = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleChange = address => {
    const [city, latLong] = address;
    this.setState(
      {
        city: city,
        initialLat: parseFloat(latLong[0]),
        initialLng: parseFloat(latLong[1]),
        selected: true,
        zoom: 10
      },
      () =>
        console.log(
          "from the SearchBox: " + this.state.city + this.state.initialLat
        )
    );
  };

  handleSearchSubmit = () => {
    console.log("from the POST Fetch: " + this.state.city);
    fetch("/search/searchProperty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        city: this.state.city
      })
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ searching: true, searchArray: result.results }, () =>
          console.log(this.state.searchArray)
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    let resultsScreen;

    !this.state.searching
      ? (resultsScreen = (
          <div className="landingContent">
            <h1>Your Booking Information</h1>
            <div>
              <h3>Check In Date: {this.state.dateIn}</h3>
              <h3>Check Out Date: {this.state.dateOut}</h3>
              <h3>Number of Travellers: {this.state.noOfGuests}</h3>
              <h3>Destination City: {this.state.city}</h3>
              <Map
                lat={this.state.lat}
                lng={this.state.lng}
                markerArray={this.state.markerArray}
                initialLat={this.state.initialLat}
                initialLng={this.state.initialLng}
                zoom={this.state.zoom}
                selected={this.state.selected}
              />
            </div>
          </div>
        ))
      : (resultsScreen = (
        <div className="searchResults">
          <Map
            markerArray={this.state.searchArray}
            initialLat={this.state.initialLat}
            initialLng={this.state.initialLng}
            zoom={this.state.zoom}
            selected={this.state.selected}
          />
          <div className="propertyRow">
            <div className="propertyBlock">Name</div>
            <div className="propertyBlock">Name</div>
            <div className="propertyBlock">Name</div>
          </div>
        </div>
          
        ));

    return (
      <div className="landingPage">
        <SearchProperty
          changeHandler={this.changeHandler}
          dateOut={this.state.dateOut}
          dateIn={this.state.dateIn}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          city={this.state.city}
          searchSubmit={this.handleSearchSubmit}
        />
        {resultsScreen}
      </div>
    );
  }
}

export default LandingPage;
