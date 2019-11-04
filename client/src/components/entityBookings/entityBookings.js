import React, { Component } from "react";
import "./entityBookings.css";

class UserBookings extends Component {
  state = {
    bookings: null,
  };

  //fetch bookings function that fetches the booking on page load or on update.
  fetchBookings = () => {
    fetch("/entityMaint/bookings", {
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
  };

  componentDidMount() {
    this.fetchBookings();
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
                {/* Check to see if the booking to load has check out date of less then the date today
                    if so the view and ammend buttons are disable as the booking is in the past. */}
                {new Date(key.checkOutDate).getTime() < new Date().getTime() ? (
                  <div className="buttons">
                    <button
                      disabled
                      style={{ backgroundColor: "white", color: "black" }}
                    >
                      Past Booking
                    </button>
                  </div>
                ) : (
                  <div className="buttons">
                    <button
                      id={key.propertyId}
                      value={index}
                      onClick={this.openModal}
                    >
                      View Booking
                    </button>
                    <button id={key._id} value={index} onClick={this.editModel}>
                      Edit/Cancel Booking
                    </button>
                  </div>
                )}
              </div>

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
