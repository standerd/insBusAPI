import React from "react";
import Modal from "react-modal";
import "./editModal.css";

// modal custom styles
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

//allows the user to edit their booking,
const editBooking = props => {
  return (
    <div className="editModal">
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="toEditDetails">
          <h1>Booking Details</h1>
          <p>Property Name: {props.data.entityName}</p>
          <p>Total Cost: R {props.data.totalBookingCost}</p>
          <p>
            Booking Date:{" "}
            {new Date(props.data.bookingDate).toLocaleDateString()}
          </p>
          <p>Booking ID: {props.data._id}</p>
          <h5>
            Kindly note that you are only able to change your booking dates or
            guest count from this screen, should you wish to book a different
            property please cancel this booking and make a new booking from the
            home page.
          </h5>
          <form className="editForm">
            <label>Check In Date</label>
            <input
              type="date"
              value={props.checkIn}
              onChange={props.editChange("checkIn")}
            ></input>
            <label>Check Out Date</label>
            <input
              type="date"
              value={props.checkOut}
              onChange={props.editChange("checkOut")}
            ></input>
            <label>Guest Count</label>
            <input
              type="number"
              value={props.guestCount}
              onChange={props.editChange("guestCount")}
            ></input>
            <button className="editButton" onClick={props.ammendBooking}>
              Submit
            </button>
            <button className="editButton" onClick={props.deleteBooking}>
              Cancel Booking
            </button>
            <button className="editButton" onClick={props.closeModal}>
              Back to Bookings
            </button>
            {props.processing ? <h3>Processing Request</h3> : null}
            {props.success ? <h3>Change Was Successfully Submitted</h3> : null}
          </form>

          {props.unavailable ? (
            <h3
              style={{
                backgroundColor: "#b4172c",
                color: "white",
                padding: "0.5%"
              }}
            >
              These Dates Are Not Available
            </h3>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default editBooking;
