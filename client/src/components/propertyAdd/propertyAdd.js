import React, { Component } from "react";
import "./propertyAdd.css";
import { withRouter } from "react-router-dom";

class PropertyAdd extends Component {
  state = {
    name: "",
    type: "",
    street: "",
    city: "",
    country: "",
    suburb: "",
    postal: "",
    telNo: "",
    altNo: "",
    email: "",
    adminName: "",
    password: "",
    offPeakRates: "",
    peakRates: "",
    description: "",
    password2: "",
    error: false,
    option: [],
    index: [false, false, false, false, false, false, false, false]
  };

  // the change handler sets the state values of the input fields.
  changeHandler = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // The submithandler submits all the data that the entity entered for registration purposes.
  // the Enity will now be require to login and will then be able to add images for the profile.
  onSubmitHandler = e => {
    if (this.state.password !== this.state.password2) {
      this.setState({ error: true });
    }

    e.preventDefault();
    fetch("/entity/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        entityType: this.state.entityType,
        street: this.state.street,
        suburb: this.state.suburb,
        city: this.state.city,
        country: this.state.country,
        postalCode: this.state.postal,
        telNo: this.state.telNo,
        altNo: this.state.altNo,
        email: this.state.email,
        userName: this.state.userName,
        password: this.state.password,
        facilities: this.state.option,
        offPeakRates: this.state.offPeakRates,
        peakRates: this.state.peakRates,
        description: this.state.description
      })
    })
      .then(res => res.json())
      .then(data => {
        //if user is successfully registered, he is redirected to the maintain screen to upload images
        //and maintain his availability data.
        this.props.history.push("/maintain");
      })
      .catch(err => console.log(err));
  };

  // clicking on a checkbox adds the value, "service offered" to an array
  // the array is then stored as an array in MongoDB.
  changeCheckHandler = e => {
    // as state array values are not to be mutated, a new Array is created from
    // the current array value stored inside state. This new array is then appended
    // with the new value and then the new array is set as the new state value.
    let currentValue = e.target.name;
    let currentIndex = e.target.value;
    let oldValueArray = [...this.state.option];
    let indexArray = [...this.state.index];
    let indexOf = this.state.option.indexOf(currentValue);

    // check if the input box is active or not, if it is, the value is removed from state
    // else the value is appended to state.
    if (indexArray[currentIndex]) {
      indexArray[currentIndex] = false;
      oldValueArray.splice(indexOf, 1);
      return this.setState({ index: indexArray, option: oldValueArray });
    } else {
      indexArray[currentIndex] = true;
      oldValueArray.push(currentValue);
      return this.setState({ index: indexArray, option: oldValueArray });
    }
  };

  render() {
    return (
      <div className="addProperty">
        <form>
          <h1>Please Complete Your Details Below to Register</h1>
          <input
            type="text"
            placeholder="Your Establishment Name"
            value={this.state.name}
            onChange={this.changeHandler("name")}
          />
          <select value={this.state.type} onChange={this.changeHandler("type")}>
            <option value="">Select Establishment Type</option>
            <option value="Hotel">Hotel</option>
            <option value="Guest House">Guest House</option>
            <option value="Apartment">Apartment</option>
            <option value="Hostel">Hostel</option>
            <option value="Camp Site">Camp Site</option>
          </select>
          <input
            type="text"
            placeholder="Street Name and Number"
            value={this.state.street}
            onChange={this.changeHandler("street")}
          />
          <input
            type="text"
            placeholder="Suburb"
            value={this.state.suburb}
            onChange={this.changeHandler("suburb")}
          />
          <input
            type="text"
            placeholder="City"
            value={this.state.city}
            onChange={this.changeHandler("city")}
          />
          <input
            type="text"
            placeholder="Country"
            value={this.state.country}
            onChange={this.changeHandler("country")}
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={this.state.postal}
            onChange={this.changeHandler("postal")}
          />

          <input
            type="text"
            placeholder="Telephone Number"
            value={this.state.telNo}
            onChange={this.changeHandler("telNo")}
          />
          <input
            type="text"
            placeholder="Alternative Number"
            value={this.state.altNo}
            onChange={this.changeHandler("altNo")}
          />
          <input
            type="email"
            placeholder="E-Mail Adress"
            value={this.state.email}
            onChange={this.changeHandler("email")}
          />
          <input
            type="text"
            placeholder="Admin Name"
            value={this.state.adminName}
            onChange={this.changeHandler("adminName")}
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={this.state.password}
            onChange={this.changeHandler("password")}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={this.state.password2}
            onChange={this.changeHandler("password2")}
          />
          <input
            type="text"
            placeholder="Peak Rates"
            value={this.state.peakRates}
            onChange={this.changeHandler("peakRates")}
          />
          <input
            type="text"
            placeholder="Off Peak Rates"
            value={this.state.offPeakRates}
            onChange={this.changeHandler("offPeakRates")}
          />
          <input
            type="text"
            placeholder="Hotel Description"
            value={this.state.description}
            onChange={this.changeHandler("description")}
          />
          <h2>Please Select Your Property Facilities From the Below Options</h2>
          <label htmlFor="at">
            <input
              type="checkBox"
              id="at"
              value={0}
              name="Airport Transfer"
              key="airport"
              onChange={this.changeCheckHandler}
            />{" "}
            Airport Transfer
          </label>

          <label>
            <input
              type="checkBox"
              value={1}
              name="Swimming Pool"
              key="pool"
              onChange={this.changeCheckHandler}
            />{" "}
            Swimming Pool
          </label>

          <label>
            <input
              type="checkBox"
              value={2}
              name="Concierge Desk"
              key="conceierge"
              onChange={this.changeCheckHandler}
            />{" "}
            Concierge Desk
          </label>

          <label>
            <input
              type="checkBox"
              value={3}
              name="Wifi"
              key="wifi"
              onChange={this.changeCheckHandler}
            />{" "}
            Wifi
          </label>

          <label>
            <input
              type="checkBox"
              value={4}
              name="Room Service"
              key="roomSevice"
              onChange={this.changeCheckHandler}
            />{" "}
            Room Service
          </label>

          <label>
            <input
              type="checkBox"
              value={5}
              name="Tea and Coffee Facilities"
              key="teaCoffee"
              onChange={this.changeCheckHandler}
            />{" "}
            Tee and Coffee Facilities
          </label>

          <label>
            <input
              type="checkBox"
              value={6}
              name="Gymnasium"
              key="gym"
              onChange={this.changeCheckHandler}
            />{" "}
            Gymnasium
          </label>

          <label>
            <input
              type="checkBox"
              value={7}
              name="Bicycle Rental"
              key="bikeRental"
              onChange={this.changeCheckHandler}
            />{" "}
            Bicyle Rental
          </label>

          <br></br>
          <button type="submit" onClick={this.onSubmitHandler}>
            Submit Form
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(PropertyAdd);
