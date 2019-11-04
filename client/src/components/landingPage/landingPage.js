import React, { Component } from "react";
import "./landingPage.css";
import SearchProperty from "../searchProperty/searchProperty";
import SearchResults from "../searchResults/searchResults";
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
      noOfGuests: "1",
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
      booking: false,
      valid: true
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //search component change handler.
  changeHandler = name => e => {
    this.setState({ [name]: e.target.value, amendSearch: true }, () => {
      let dateIn = new Date(this.state.dateIn);
      let dateOut = new Date(this.state.dateOut);
      if (dateOut.getTime() < dateIn.getTime()) {
        this.setState({ dateOut: "" });
      }
    });
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
  handleSearchSubmit = e => {
    e.preventDefault();
    this.state.city === ""
      ? this.setState({ valid: false })
      : fetch("/search/searchProperty", {
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
            this.setState({
              searching: true,
              searchArray: result.results,
              amendSearch: false,
              valid: true
            });
          })
          .catch(err => console.log(err));
  };

  // property details modal, opening event handler
  openModal = e => {
    this.setState({ modalIsOpen: true, displayID: e.target.id });
  };

  // property details modal, closing event handler
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  // Booking submit handler, redirects the user to the booking page and
  // passes the booking information along.
  makeBooking = () => {
    this.setState({ booking: true, modalIsOpen: false });
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

    // if no search was submitted by the user yet, the below is displayed next
    // to the user search sidedrawer
    !this.state.searching
      ? (resultsScreen = (
          <div className="landingContent">
            <div className="overLay">
              <h1 className="heading">
                Where Ever The Map Takes You We Have You Covered
              </h1>
              <hr></hr>
            </div>
          </div>
        ))
      : // if the user has submitted as search request, the search result is diplayed instead of the
        // main landing content.
        (resultsScreen = (
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
              auth={this.props.isAuth}
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
          type={this.props.type}
          typeUpdate={this.props.typeUpdate}
          noOfGuests={this.state.noOfGuests}
          valid={this.state.valid}
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
