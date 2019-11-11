import React, { Component } from "react";
import "./propertyAdd.css";
import { withRouter, Link } from "react-router-dom";

//property registration component.
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
    error2: false,
    option: [],
    loading: false,
    //looks strange, used to manage the state of the checkboxes.
    index: [false, false, false, false, false, false, false, false]
  };

  // the change handler sets the state values of the input fields.
  changeHandler = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // The submithandler submits all the data that the entity entered for registration purposes.
  // the Enity will now be required to login and will then be able to add images for the profile.
  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.state.password !== this.state.password2) {
      this.setState({ error: true, loading: false });
    } else {
      this.setState({ error: false }, () => {
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
          .then(res => {
            if (res.status === 401) {
              throw new Error(
                "Validation failed. Make sure the email address isn't used yet!"
              );
            }

            if (res.status !== 200 && res.status !== 201) {
              console.log("Error!");
              throw new Error("Creating a user failed!");
            }

            return res.json();
          })
          .then(result => {
            this.setState({ error: false, error2: false, loading: false });
            this.props.history.push("/loginProperty");
          })
          .catch(err => this.setState({ error2: true, loading: false }));
      });
    }
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
        <div className="backgroundBlur">
          <form onSubmit={this.onSubmitHandler}>
            <h1>Please Complete Your Details Below to Register</h1>
            <input
              type="text"
              placeholder="Your Establishment Name"
              value={this.state.name}
              onChange={this.changeHandler("name")}
              required
            />
            <select
              required
              value={this.state.type}
              onChange={this.changeHandler("type")}
            >
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
              required
            />
            <input
              type="text"
              placeholder="Suburb"
              value={this.state.suburb}
              onChange={this.changeHandler("suburb")}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={this.state.city}
              onChange={this.changeHandler("city")}
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={this.state.country}
              onChange={this.changeHandler("country")}
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={this.state.postal}
              onChange={this.changeHandler("postal")}
              required
            />

            <input
              type="text"
              placeholder="Telephone Number"
              value={this.state.telNo}
              onChange={this.changeHandler("telNo")}
              required
            />
            <input
              type="text"
              placeholder="Alternative Number"
              value={this.state.altNo}
              onChange={this.changeHandler("altNo")}
              required
            />
            <input
              type="email"
              placeholder="E-Mail Adress"
              value={this.state.email}
              onChange={this.changeHandler("email")}
              required
            />
            <input
              type="text"
              placeholder="Admin Name"
              value={this.state.adminName}
              onChange={this.changeHandler("adminName")}
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={this.state.password}
              onChange={this.changeHandler("password")}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.changeHandler("password2")}
              required
            />
            <input
              type="text"
              placeholder="Peak Rates"
              value={this.state.peakRates}
              onChange={this.changeHandler("peakRates")}
              required
            />
            <input
              type="text"
              placeholder="Off Peak Rates"
              value={this.state.offPeakRates}
              onChange={this.changeHandler("offPeakRates")}
              required
            />
            <textarea
              placeholder="Hotel Description"
              value={this.state.description}
              onChange={this.changeHandler("description")}
              required
              rows="5"
              // cols="118"
            ></textarea>

            <h2>
              Please Select Your Property Facilities From the Below Options
            </h2>
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
            {this.state.error ? (
              <h3 style={{ color: "red" }}>
                Passwords Do Not Match Please Try Again
              </h3>
            ) : null}
            {this.state.error2 ? (
              <h3 style={{ color: "red" }}>
                Could not Register You, Make Sure the Email is Not Already Used
              </h3>
            ) : null}
            <br></br>
            <button type="submit">Submit Form</button>
          </form>
          {this.state.loading ? (
            <h2 style={{ color: "green" }}>Processing Please Wait</h2>
          ) : null}
          <p>Already Have An Account</p>
          <Link to="/loginProperty">Login Here</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(PropertyAdd);
