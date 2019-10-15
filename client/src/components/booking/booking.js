import React, { Component } from "react";
import "./booking.css";
import { withRouter } from "react-router-dom";

class Booking extends Component {
  state = {
    propertyDetails: null,
    name: "",
    street: "",
    city: "",
    email: "",
    contact1: "",
    contact2: "",
    dateIn: "",
    dateOut: "",
    occupants: "",
    postal: ""
  };

  onChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  confirmBooking = e => {
    e.preventDefault();
    fetch();
  };

  cancelBooking = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    this.setState(
      {
        propertyDetails: this.props.location.state.propertyDetails,
        dateIn: this.props.location.state.checkIn,
        dateOut: this.props.location.state.checkOut,
        occupants: this.props.location.state.occupants
      },
      () => console.log(this.state.propertyDetails)
    );
  }

  render() {
    let table;
    let days;

    this.state.dateIn === ""
      ? (days = "0")
      : (days =
          (new Date(this.state.dateOut).getTime() -
            new Date(this.state.dateIn).getTime()) /
          (1000 * 3600 * 24));

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
                <td>R 3 200.00</td>
              </tr>
            </tbody>
          </table>
        ));

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
                  : "/images/" + this.state.propertyDetails.images[0]
              }
              alt=""
            />
            {table}
          </div>
          <div className="userDetails">
            <h1>Please Complete Your Booking Below</h1>
            <form>
              <input
                type="text"
                placeholder="Your Name And Surname"
                onChange={this.onChange("name")}
              />
              <input
                type="text"
                placeholder="Street Name"
                onChange={this.onChange("street")}
              />
              <input
                type="text"
                placeholder="City Name"
                onChange={this.onChange("city")}
              />
              <input
                type="text"
                placeholder="Postal Code"
                onChange={this.onChange("postal")}
              />
              <input
                type="text"
                placeholder="Country Name"
                onChange={this.onChange("name")}
              />
              <input
                type="text"
                placeholder="Confirm E-Mail Address"
                onChange={this.onChange("email")}
              />
              <input
                type="text"
                placeholder="Contact Number 1"
                onChange={this.onChange("contact1")}
              />
              <input
                type="text"
                placeholder="Contact Number 2"
                onChange={this.onChange("contact2")}
              />
              <button type="submit" onClick={this.confirmBooking}>
                Complete Booking
              </button>
              <h4>Or</h4>
              <button onClick={this.cancelBooking}>Cancel Booking</button>
            </form>
            <h3>
              We are working on an Electronic Payment Method, you will pay the
              property on Arrival
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Booking);
