import React, { Component } from "react";
import "./allBookings.css";

class AllBookings extends Component {
  state = {
    bookings: null
  };

  // all bookings are fetched during the component did mount.
  componentDidMount() {
    fetch("/admin/bookings", {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ bookings: result.bookings });
      });
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
          There are no active bookings
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
                <td>{key.checkOutDate}</td>
                <td>R {parseFloat(key.totalBookingCost) * 0.1}</td>
                <td>{key.userId}</td>
                <td>{key.propertyId}</td>
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
                <td>{key.checkOutDate}</td>
                <td>R {parseFloat(key.totalBookingCost) * 0.1}</td>
                <td>{key.userId}</td>
                <td>{key.propertyId}</td>
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
                <th>Check Out</th>
                <th>Commission</th>
                <th>Client ID</th>
                <th>Prop ID</th>
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
                <th>Check Out</th>
                <th>Commission</th>
                <th>Client ID</th>
                <th>Prop ID</th>
              </tr>
            </thead>
            <tbody>{oldBookings}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllBookings;
