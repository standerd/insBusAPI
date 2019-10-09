import React, { Component } from "react";
import "./landingPage.css";
import SearchProperty from "../searchProperty/searchProperty";
import Map from "../maps/map";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

class LandingPage extends Component {
  state = {
    dateIn: "",
    dateOut: "",
    noOfGuests: "",
    city: "",
    lat: "",
    zoomLevel: 3,
    lng: ""
  };

  changeHandler = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleChange = address => {
    this.setState({ city: address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          city: address,
          lat: latLng.lat,
          lng: latLng.lng
        });
        console.log("Success", latLng, address);
      })
      .catch(error => console.error("Error", error));
  };

  componentDidUpdate() {
    console.log(this.state);
    console.log(typeof this.state.lng);
  }

  render() {
    return (
      <div className="landingPage">
        <SearchProperty
          changeHandler={this.changeHandler}
          dateOut={this.state.dateOut}
          dateIn={this.state.dateIn}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          city={this.state.city}
        />
        <div className="landingContent">
          <h1>Your Booking Information</h1>
          <div>
            <h3>Check In Date: {this.state.dateIn}</h3>
            <h3>Check Out Date: {this.state.dateOut}</h3>
            <h3>Number of Travellers: {this.state.noOfGuests}</h3>
            <h3>Destination City: {this.state.city}</h3>
            <Map lat={this.state.lat} lng={this.state.lng} />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
