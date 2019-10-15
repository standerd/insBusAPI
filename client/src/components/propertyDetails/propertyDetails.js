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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
let images;

class PropertyDetails extends Component {
  state = {
    imgIndex: 0
  };

  onClick = e => {
    this.setState({ imgIndex: e.target.id });
  };

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
    this.props.details === undefined
      ? (images = null)
      : (images = this.props.details.images);

    console.log("From Images" + images);

    let imgSrc;

    images === null
      ? (imgSrc = null)
      : (imgSrc = images.map((key, index) => {
          return (
            <img
              key={index}
              id={index}
              onClick={this.onClick}
              src={"/images/" + key}
              alt=""
            />
          );
        }));

    let days;

    this.props.dateOut === "" || this.props.dateIn === ""
      ? (days = "0")
      : (days =
          (new Date(this.props.dateOut).getTime() -
            new Date(this.props.dateIn).getTime()) /
          (1000 * 3600 * 24));

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
                      <td>R 1200 Per Night</td>
                    </tr>
                    <tr>
                      <td>Off-Peak Season</td>
                      <td>R 1000 Per Night</td>
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
                <p>Total Price : R 3 600-00</p>
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
                  src={
                    images === null
                      ? ""
                      : "/images/" + images[this.state.imgIndex]
                  }
                  alt=""
                />
              </div>
              <div className="propertyDetails">
                <div className="propDescription">
                  <h1>Description</h1>
                  <p>
                    My Beach Hotel is Located within walking distance from the
                    beach and has vaious options for dining available both on
                    site as well as various restaurants within close walking
                    distance. We serve a great breakfast, and out staff is
                    always willing to assist with whatever assistance you
                    require.
                  </p>
                </div>
                <div className="propFacilities">
                  <h1>Main Facilities</h1>
                  <div className="facilities">
                    <p>Wifi</p>
                    <p>Concierge Services</p>
                    <p>Bicycle Rental</p>
                    <p>Swimming Pool</p>
                    <p>Gymnasium</p>
                    <p>Airport Transfers</p>
                    <p>Room Service</p>
                    <p>Tea/Coffee Facilities</p>
                  </div>
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
