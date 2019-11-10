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
      valid: true,
      showInfo: false,
      markerIndex: "",
      getError: false,
      waiting: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //search component change handler.
  changeHandler = name => e => {
    this.setState({ [name]: e.target.value, amendSearch: true }, () => {
      //if the user change his search dates and the dateIn becomes larger than the dateOut
      //date Out is reset to no value.
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
    this.setState({ waiting: true });
    this.state.city === ""
      ? this.setState({ valid: false })
      : fetch("/search/searchProperty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            city: this.state.city,
            lat: this.state.initialLat,
            lng: this.state.initialLng
          })
        })
          .then(res => res.json())
          .then(result => {
            // if no properties were found for the search location entered by the user
            // the server returns null, if null is received an error is set and a message
            // is shown to the user which cities have got properties loaded.
            if (result.results === null) {
              this.setState({ getError: true, searching: true });
            } else {
              this.setState({
                searching: true,
                searchArray: result.results,
                amendSearch: false,
                valid: true,
                getError: false,
                waiting: false
              });
            }
          })
          .catch(err => console.log("There was an errro" + err));
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

  openWindow = index => {
    this.setState({ showInfo: true, markerIndex: index });
  };

  closeWindow = () => {
    this.setState({ showInfo: false });
  };

  render() {
    let resultsScreen;

    // if no search was submitted by the user yet, the below is displayed next
    // to the user search sidedrawer
    if (!this.state.searching && !this.state.getError) {
      resultsScreen = (
        <div className="landingContent">
          <div className="overLay">
            <h1 className="heading">
              Where Ever The Map Takes You We Have You Covered
            </h1>
            <hr></hr>
          </div>
        </div>
      );
    } else if (this.state.searching && !this.state.getError) {
      // if the user has submitted as search request, the search result is diplayed instead of the
      // main landing content.
      resultsScreen = (
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
            openWindow={this.openWindow}
            closeWindow={this.closeWindow}
            showInfo={this.state.showInfo}
            propsName={
              this.state.markerIndex === ""
                ? "No Info"
                : this.state.searchArray[this.state.markerIndex].name
            }
            propsLat={
              this.state.markerIndex === ""
                ? "No Info"
                : this.state.searchArray[this.state.markerIndex].lat
            }
            propsLng={
              this.state.markerIndex === ""
                ? "No Info"
                : this.state.searchArray[this.state.markerIndex].long
            }
          />
        </div>
      );
    } else if (this.state.searching && this.state.getError) {
      // if the user has submitted as search request, the search result is diplayed instead of the
      // main landing content.
      resultsScreen = (
        <div className="errorResult">
          <h3>We could not find any properties for your search location</h3>
          <h3>
            While we are starting we only have properties in Johannsburg and
            Cape Town
          </h3>
          <h3>We will add more in due course</h3>
        </div>
      );
    }

    return (
      <div className="landingPage">
        <SearchProperty
          changeHandler={this.changeHandler}
          dateOut={this.state.dateOut}
          dateIn={this.state.dateIn}
          handleChange={this.handleChange}
          city={this.state.city}
          searchSubmit={this.handleSearchSubmit}
          type={this.props.type}
          typeUpdate={this.props.typeUpdate}
          noOfGuests={this.state.noOfGuests}
          valid={this.state.valid}
          waiting={this.state.waiting}
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
