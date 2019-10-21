import React, { Component } from "react";
import Modal from "react-modal";
import "./propertyDetails.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    height: "auto"
  }
};

Modal.setAppElement("#root");
let images;

class PropertyDetails extends Component {
  state = {
    imgIndex: 0
  };

  // on thumbnail click sets the main image array index, for loading the image.
  onClick = e => {
    this.setState({ imgIndex: e.target.id });
  };

  // main image contains 2 arrows to scroll through them, this is the function controlling the clicks.
  imgScroll = e => {
    let newIndex;
    if (e.target.id === "next" && this.state.imgIndex < images.length - 1) {
      newIndex = this.state.imgIndex + 1;
      this.setState({ imgIndex: newIndex });
    } else if (e.target.id === "back" && this.state.imgIndex > 0) {
      newIndex = this.state.imgIndex - 1;
      this.setState({ imgIndex: newIndex });
    }
  };

  render() {
    //on initial load the images array is empty due to a small timing between render and componentdidmount
    //receiving props, props can never be empty as a user cannot get to the details without having come
    //from the searchresults.

    // sets the images array
    this.props.details === undefined
      ? (images = null)
      : (images = this.props.details.images);

    let imgSrc;

    images === null
      ? (imgSrc = null)
      : (imgSrc = images.map((key, index) => {
          return (
            <img
              key={index}
              id={index}
              onClick={this.onClick}
              src={"/" + key}
              alt=""
            />
          );
        }));

    // The stay duration is calculted from the in and out days.
    let days;

    this.props.dateOut === "" || this.props.dateIn === ""
      ? (days = "0")
      : (days =
          (new Date(this.props.dateOut).getTime() -
            new Date(this.props.dateIn).getTime()) /
          (1000 * 3600 * 24));

    // sets the facilties based on the received facilities array from the property database.
    let facility;

    this.props.details === undefined
      ? (facility = <p>No Facilities Noted</p>)
      : (facility = this.props.details.facilities.map(key => {
          return <p key={key}>{key}</p>;
        }));

    // setup Rates

    let rates;

    this.props.details === undefined
      ? (rates = [0, 0])
      : (rates = [
          this.props.details.offPeakRates,
          this.props.details.peakRates
        ]);

    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h1 style={{ textAlign: "center" }}>
            {this.props.details === undefined
              ? "No Property Loaded"
              : this.props.details.name}
          </h1>
          <div className="mainContent">
            <div className="imgDrawer">
              <div className="imgBox">{imgSrc}</div>
              <div className="rates">
                <h1>RATES</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Peak Season</td>
                      <td>R {rates[1]} Per Night</td>
                    </tr>
                    <tr>
                      <td>Off-Peak Season</td>
                      <td>R {rates[0]} Per Night</td>
                    </tr>
                  </tbody>
                </table>
                <h3>Your Booking Details</h3>
                <p>
                  Check In : {this.props.dateIn} Check Out :{" "}
                  {this.props.dateOut}
                </p>
                <p>
                  {this.props.persons} x Adults for {days} Nights
                </p>
                <p>
                  Total Price : R{" "}
                  {parseInt(parseInt(rates[0]) * parseInt(days))}
                </p>
                <button onClick={this.props.makeBooking}>
                  Book This Property
                </button>
                <button onClick={this.props.closeModal}>
                  Back To Search Results
                </button>
              </div>
            </div>

            <div className="contentDrawer">
              <div className="mainImg">
                <p className="forward">
                  <i
                    id="back"
                    onClick={this.imgScroll}
                    className="fas fa-chevron-left"
                  ></i>
                </p>
                <p className="back">
                  <i
                    id="next"
                    onClick={this.imgScroll}
                    className="fas fa-chevron-right"
                  ></i>
                </p>
                <img
                  src={images === null ? "" : "/" + images[this.state.imgIndex]}
                  alt=""
                />
              </div>
              <div className="propertyDetails">
                <div className="propDescription">
                  <h1>Description</h1>
                  {this.props.details === undefined ? (
                    <p>None</p>
                  ) : (
                    <p>{this.props.details.description}</p>
                  )}
                </div>
                <div className="propFacilities">
                  <h1>Main Facilities</h1>
                  <div className="facilities">{facility}</div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PropertyDetails;
