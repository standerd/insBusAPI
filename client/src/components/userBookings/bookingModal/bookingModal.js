import React from "react";
import Modal from "react-modal";
import "./bookingModal.css";
import Map from "../../maps/map";

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

// "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-26.17338046,28.027493754&radius=5000&key=AIzaSyDTo_2pBvjLZ40oamTNXbUFa5ZgJOUfKrs"

Modal.setAppElement("#root");

const bookingDetails = props => {
  let propDetails;

  props.propertyDetails === null || props.bookingDetails === null
    ? (propDetails = null)
    : (propDetails = (
        <div className="contentPortion">
          <button className="exitButton" onClick={props.closeModal}>
            Back to Bookings
          </button>
          <h1 className="modalHead">Property Details</h1>
          <div className="border">
            <img
              style={{ width: "70%" }}
              src={"/" + props.propertyDetails.images[0]}
              alt=""
            ></img>
            <p>Property Name: {props.propertyDetails.name}</p>
            <p>Street: {props.propertyDetails.street}</p>
            <p>City: {props.propertyDetails.city}</p>
            <p>Country: {props.propertyDetails.country}</p>
            <p>Tel No: {props.propertyDetails.telNo}</p>
            <p>E-Mail: {props.propertyDetails.email}</p>
            <p>
              GPS: {props.propertyDetails.lat} , {props.propertyDetails.long}
            </p>
          </div>
        </div>
      ));

  return (
    <div className="bookingModal">
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bookingContent">
          {propDetails}

          <div className="contentPortion">
            <h1 className="modalHead">Property Location</h1>
            {props.propertyDetails === null ? (
              <p>To Load</p>
            ) : (
              <div>
                <div className="border">
                  <Map
                    lat={parseFloat(props.propertyDetails.lat)}
                    lng={parseFloat(props.propertyDetails.long)}
                    markerArray={[
                      {
                        _id: "1",
                        lat: parseFloat(props.propertyDetails.lat),
                        long: parseFloat(props.propertyDetails.long)
                      }
                    ]}
                    initialLat={parseFloat(props.propertyDetails.lat)}
                    initialLng={parseFloat(props.propertyDetails.long)}
                    zoom={13}
                    selected={true}
                  />
                </div>
                <h1 className="modalHead">Booking Details</h1>
                <div className="border">
                  <p>Check In Date: {props.bookingDetails.checkInDate}</p>
                  <p>Check Out Date: {props.bookingDetails.checkOutDate}</p>
                  <p>No of Guests: {props.bookingDetails.guestCount}</p>
                  <p>Total Cost: R {props.bookingDetails.totalBookingCost}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default bookingDetails;
