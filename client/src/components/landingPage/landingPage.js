import React, { Component } from "react";
import "./landingPage.css";
import SearchProperty from "../searchProperty/searchProperty";
import SearchResults from "../searchResults/searchResults";
import Map from "../maps/map";
import Modal from "react-modal";
import PropDetails from "../propertyDetails/propertyDetails";
import { withRouter } from "react-router-dom";

Modal.setAppElement("#root");

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
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
      selected: false,
      amendSearch: false,
      modalIsOpen: false,
      displayID: "",
      booking: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //search component change handler.
  changeHandler = name => e => {
    this.setState({ [name]: e.target.value, amendSearch: true });
  };

  //google standalone searchbox change handler, received params from searchbox component
  //params are then destructured and state is set with the values of the search.
  handleChange = address => {
    const [city, latLong] = address;
    this.setState({
      city: city,
      initialLat: parseFloat(latLong[0]),
      initialLng: parseFloat(latLong[1]),
      selected: true,
      zoom: 10
    });
  };

  //search component on click handler, once the search details is submitted, the data is
  //sent to the server as a POST request and the returned data is set to state.
  handleSearchSubmit = () => {
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
        this.setState(
          { searching: true, searchArray: result.results, amendSearch: false },
          () => console.log(this.state.searchArray)
        );
      })
      .catch(err => console.log(err));
  };

  openModal = e => {
    this.setState({ modalIsOpen: true, displayID: e.target.id });
  };

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  makeBooking = () => {
    this.setState({ booking: true, modalIsOpen: false }, () =>
      console.log(this.state.modalIsOpen + "- " + this.state.booking)
    );
    this.props.history.push({
      pathname: "/book",
      state: {
        id: this.state.displayID,
        propertyDetails: this.state.searchArray[this.state.displayID],
        checkIn: this.state.dateIn,
        checkOut: this.state.dateOut,
        occupants: this.state.noOfGuests
      }
    });
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
              <br></br>
            </div>
          </div>
        ))
      : (resultsScreen = (
          <div className="searchResults">
            <SearchResults
              markerArray={this.state.searchArray}
              initialLat={this.state.initialLat}
              initialLng={this.state.initialLng}
              zoom={this.state.zoom}
              selected={this.state.selected}
              dateIn={this.state.dateIn}
              dateOut={this.state.dateOut}
              amendSearch={this.state.amendSearch}
              openModal={this.openModal}
            />
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
        <PropDetails
          details={this.state.searchArray[this.state.displayID]}
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          makeBooking={this.makeBooking}
          dateIn={this.state.dateIn}
          dateOut={this.state.dateOut}
          persons={this.state.noOfGuests}
        />
      </div>
    );
  }
}

export default withRouter(LandingPage);
