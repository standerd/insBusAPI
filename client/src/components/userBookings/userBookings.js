import React, { Component } from "react";
import BookingModal from "../userBookings/bookingModal/bookingModal";
import "./userBookings.css";

class UserBookings extends Component {
  state = {
    modalIsOpen: false,
    bookings: null,
    propertyDetails: null,
    index: 0
  };

  openModal = e => {
    let index = e.target.value;
    let id = e.target.id;
    console.log(e.target.value);
    fetch(`/search/getProperty/${id}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ propertyDetails: result.details, index: index }, () => {
          console.log(this.state.propertyDetails);
          this.setState({ modalIsOpen: true });
        });
      })
      .catch(err => console.log(err));
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidMount() {
    fetch("/search/myBookings", {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ bookings: result.bookings }, () =>
          console.log(this.state.bookings)
        );
      });
  }

  render() {
    let myBookings;
    let bookingsArray = this.state.bookings;
    let message;

    bookingsArray === null ||
    bookingsArray === undefined ||
    bookingsArray.length === 0
      ? (message = (
          <h2 style={{ textAlign: "center", backgroundColor: "red" }}>
            You have no active bookings
          </h2>
        ))
      : (message = null);

    bookingsArray === null || bookingsArray === undefined
      ? (myBookings = <div className="lds-hourglass"></div>)
      : (myBookings = bookingsArray.map((key, index) => {
          return (
            <div key={key._id}>
              <div className="individualBooking">
                <div className="images">
                  <h3>{key.entityName}</h3>
                  <img src={"/" + key.imageSrc} alt="" />
                </div>
                <div className="details">
                  <h3>Destination: {key.destination}</h3>
                  <h3>Check In Date: {key.checkInDate}</h3>
                  <h3>Check Out Date: {key.checkOutDate}</h3>
                  <h3>Number of Guests: {key.guestCount}</h3>
                </div>
                <div className="buttons">
                  <button
                    id={key.propertyId}
                    value={index}
                    onClick={this.openModal}
                  >
                    View Booking
                  </button>
                  <button>Edit/Cancel Booking</button>
                </div>
              </div>
              <BookingModal
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
                propertyDetails={this.state.propertyDetails}
                bookingDetails={this.state.bookings[this.state.index]}
              />
            </div>
          );
        }));

    return (
      <div className="userBookings">
        <h1 style={{ textAlign: "center" }}>Booking Manager</h1>
        {message}
        {myBookings}
      </div>
    );
  }
}

export default UserBookings;
