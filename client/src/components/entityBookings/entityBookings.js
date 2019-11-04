import React, { Component } from "react";
import "./entityBookings.css";

class UserBookings extends Component {
  state = {
    bookings: null
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
        this.setState({ bookings: result.bookings });
      });
  };

  componentDidMount() {
    this.fetchBookings();
  }

  render() {
    let myBookings;
    let bookingsArray = this.state.bookings;
    let message;
    let oldBookings;

    if (bookingsArray === undefined || bookingsArray === null) {
      message = <div className="lds-hourglass"></div>;
    } else if (bookingsArray.length === 0) {
      message = (
        <h2 style={{ textAlign: "center", backgroundColor: "red" }}>
          You have no active bookings
        </h2>
      );
    }

    //entity bookings that are returned is split between expired and currently active bookings.
    //first map function checkes for bookings that are not yet past the check out date
    bookingsArray === null || bookingsArray === undefined
      ? (myBookings = null)
      : (myBookings = bookingsArray.map((key, index) => {
          if (new Date(key.checkOutDate).getTime() > new Date().getTime()) {
            return (
              <tr key={key._id}>
                <td>{key._id} </td>
                <td>{new Date(key.bookingDate).toLocaleDateString()}</td>
                <td>{key.checkInDate}</td>
                <td>{key.checkOutDate}</td>
                <td>{key.guestCount}</td>
                <td>R {key.totalBookingCost}</td>
                <td>R {parseFloat(key.totalBookingCost) * 0.1}</td>
                <td>{key.name}</td>
                <td>{key.contact}</td>
              </tr>
            );
          } else {
            return null;
          }
        }));

    // second map function returns values where the check out dates are past the current date and then
    //returns the value to the old bookings mapped value.
    bookingsArray === null || bookingsArray === undefined
      ? (oldBookings = null)
      : (oldBookings = bookingsArray.map((key, index) => {
          if (new Date(key.checkOutDate).getTime() < new Date().getTime()) {
            return (
              <tr key={key._id}>
                <td>{key._id} </td>
                <td>{new Date(key.bookingDate).toLocaleDateString()}</td>
                <td>{key.checkInDate}</td>
                <td>{key.checkOutDate}</td>
                <td>{key.guestCount}</td>
                <td>R {key.totalBookingCost}</td>
                <td>R {parseFloat(key.totalBookingCost) * 0.1}</td>
                <td>{key.name}</td>
                <td>{key.contact}</td>
              </tr>
            );
          } else {
            return null;
          }
        }));

    return (
      <div className="entBookings">
        <h1>Bookings</h1>
        {message}
        <div className="bookDisplay">
          <h1>Current Bookings</h1>
          <table>
            <thead>
              <tr>
                <th>Booking No</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Guests</th>
                <th>Income</th>
                <th>Commission</th>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>{myBookings}</tbody>
          </table>
          <br></br>
          <h1>Previous Bookings</h1>
          <table>
            <thead>
              <tr>
                <th>Booking No</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Guests</th>
                <th>Income</th>
                <th>Commission</th>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>{oldBookings}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserBookings;
