import React, { Component } from "react";
import "./booking.css";
import { withRouter, Link } from "react-router-dom";

let days;

class Booking extends Component {
  state = {
    propertyDetails: null,
    name: "",
    street: "",
    city: "",
    email: "",
    country: "",
    contact1: "",
    contact2: "",
    dateIn: "",
    dateOut: "",
    occupants: "",
    postal: "",
    bookingCost: "",
    bookingNo: "",
    bookingCompleted: false,
    loading: false
  };

  // booking information capture details change handler
  onChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // booking confirmation handler, submits the booking data to the server for database storage.
  confirmBooking = e => {
    e.preventDefault();
    this.setState({ loading: true });

    let userId = localStorage.getItem("userId");

    // occupation is sent along with the request to ensure that the enities availablity is updated
    // in order to prevent duplicate bookings.

    let occupation = [];

    let myFirstDate = new Date(this.state.dateIn);
    let myLastDate = new Date(this.state.dateOut);
    let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

    for (let i = 0; i < duration; i++) {
      let myDate = myFirstDate.toLocaleDateString();
      occupation.push(myDate);
      myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
    }

    //server fetch request with booking details
    fetch("/search/finaliseBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        propertyId: this.state.propertyDetails._id,
        checkInDate: this.state.dateIn,
        checkOutDate: this.state.dateOut,
        guestCount: this.state.occupants,
        totalBookingCost: this.state.propertyDetails.offPeakRates * days,
        bookingDate: new Date(),
        street: this.state.street,
        city: this.state.city,
        country: this.state.country,
        postal: this.state.postal,
        name: this.state.name,
        email: this.state.email,
        contact: this.state.contact1,
        bookingArray: occupation,
        destination: this.state.propertyDetails.city,
        imageSrc: this.state.propertyDetails.images[0],
        entityName: this.state.propertyDetails.name
      })
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ bookingNo: result.booking }, () => {
          //booking completed controls if the user sees the booking info capture screen
          //or the booking confirmation screen.
          this.setState({ bookingCompleted: true, loading: false });
        });
      })
      .catch(err => console.log(err));
  };

  // if the user cancels the booking he is redirected to the landing page,
  // no information on the search is store.
  cancelBooking = () => {
    this.props.history.push("/");
  };

  // the state is set that is received from props on component mounting.
  componentDidMount() {
    this.setState({
      propertyDetails: this.props.location.state.propertyDetails,
      dateIn: this.props.location.state.checkIn,
      dateOut: this.props.location.state.checkOut,
      occupants: this.props.location.state.occupants
    });
  }

  render() {
    let table;
    let bookingArea;

    // number of nights are calculated from the in and out dates.
    this.state.dateIn === ""
      ? (days = "0")
      : (days =
          (new Date(this.state.dateOut).getTime() -
            new Date(this.state.dateIn).getTime()) /
          (1000 * 3600 * 24));

    // this should never be blank as you cannot reach the page without booking details,
    // hover errors will be logged due to the timing or render vs componentDidMount
    this.state.propertyDetails === null
      ? (table = <p>No Booking Details</p>)
      : (table = (
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td className="column1">Property Name: </td>
                <td>{this.state.propertyDetails.name}</td>
              </tr>
              <tr>
                <td>Check In Date: </td>
                <td>{this.state.dateIn}</td>
              </tr>
              <tr>
                <td className="column1">Check Out Date: </td>
                <td>{this.state.dateOut}</td>
              </tr>
              <tr>
                <td className="column1">No of Nights:</td>
                <td>{days}</td>
              </tr>
              <tr>
                <td className="column1">No of Occupants: </td>
                <td>{this.state.occupants}</td>
              </tr>
              <tr>
                <td className="column1">Total Cost: </td>
                <td>R {this.state.propertyDetails.offPeakRates * days}</td>
              </tr>
            </tbody>
          </table>
        ));

    //booking area is either the booking form or the booking confirmation depending
    //on wheether the booking was completed or not.
    if (!this.state.bookingCompleted && !this.state.loading) {
      bookingArea = (
        <div className="userDetails">
          <h1>Please Complete Your Booking Below</h1>
          <form onSubmit={this.confirmBooking}>
            <input
              type="text"
              placeholder="Your Name And Surname"
              onChange={this.onChange("name")}
              required
            />
            <input
              type="text"
              placeholder="Street Name"
              onChange={this.onChange("street")}
              required
            />
            <input
              type="text"
              placeholder="City Name"
              onChange={this.onChange("city")}
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              onChange={this.onChange("postal")}
              required
            />
            <input
              type="text"
              placeholder="Country Name"
              onChange={this.onChange("country")}
              required
            />
            <input
              type="text"
              placeholder="Confirm E-Mail Address"
              onChange={this.onChange("email")}
              required
            />
            <input
              type="text"
              placeholder="Contact Number 1"
              onChange={this.onChange("contact1")}
              required
            />
            <input
              type="text"
              placeholder="Contact Number 2"
              onChange={this.onChange("contact2")}
              required
            />
            <button type="submit">Complete Booking</button>
            <h4>Or</h4>
            <button onClick={this.cancelBooking}>Cancel Booking</button>
          </form>
          <h3>
            We are working on an Electronic Payment Method, you will pay the
            property on Arrival
          </h3>
        </div>
      );
    } else if (this.state.loading) {
      bookingArea = (
        <div className="bookingCompleted">
          <div className="lds-hourglass"></div>
        </div>
      );
    } else {
      bookingArea = (
        <div className="bookingCompleted">
          <h1 style={{ textAlign: "center" }}>Thank You For Your Booking</h1>
          <br></br>
          <h3 style={{ textAlign: "center" }}>
            Your Booking No: {this.state.bookingNo}
          </h3>
          <br></br>
          <h4>Important Information</h4>
          <p>The Property Has Been Notified of Your Booking</p>
          <p>
            If You Need to Make Any Changes Please Do So From Your Booking
            Manager
          </p>
          <p>
            You Can Also View The Properties Direct Contact Details From There
          </p>
          <p>
            Or Follow The Link On The Booking Management Please To Send Them An
            Email
          </p>
          <Link to="/">Go To Home Page</Link> <br></br>
          <br></br>
          <Link to="/userBookings">View All Bookings</Link>
        </div>
      );
    }

    return (
      <div className="booking">
        <div className="bookingPage">
          <div className="bookingDetails">
            <h1>Your Booking Summary</h1>
            <img
              width="80%"
              src={
                this.state.propertyDetails === null
                  ? ""
                  : "/" + this.state.propertyDetails.images[0]
              }
              alt=""
            />
            {table}
          </div>
          {bookingArea}
        </div>
      </div>
    );
  }
}

export default withRouter(Booking);
