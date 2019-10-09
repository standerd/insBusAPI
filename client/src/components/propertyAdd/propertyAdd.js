import React, { Component } from "react";
import "./propertyAdd.css";

class PropertyAdd extends Component {
  state = {
    name: "",
    type: "",
    street: "",
    city: "",
    country: "",
    postal: "",
    telNo: "",
    altNo: "",
    email: "",
    adminName: "",
    password: "",
    option: [],
    index: [false, false, false, false, false, false, false, false]
  };

  changeHandler = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(this.state);
  };

  onSubmitHandler = e => {
    e.preventDefault();
  };

  changeCheckHandler = e => {
    let currentValue = e.target.name;
    let currentIndex = e.target.value;
    let oldValueArray = [...this.state.option];
    let indexArray = [...this.state.index];
    let indexOf = this.state.option.indexOf(currentValue);

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

  componentDidUpdate() {
    console.log(this.state.index);
    console.log(this.state.option);
  }

  render() {
    return (
      <div className="addProperty">
        <h1>Please Complete Your Details Below to Register</h1>
        <form>
          <input
            type="text"
            placeholder="Your Establishment Name"
            defaultValue={this.state.name}
            onChange={this.changeHandler("name")}
          />
          <select
            defaultValue={this.state.type}
            onChange={this.changeHandler("type")}
          >
            <option value="">Please Select Establishment Type</option>
            <option value="Hotel">Hotel</option>
            <option value="Guest House">Guest House</option>
            <option value="Apartment">Apartment</option>
            <option value="Hostel">Hostel</option>
            <option value="Camp Site">Camp Site</option>
          </select>
          <input
            type="text"
            placeholder="Street Name and Number"
            defaultValue={this.state.street}
            onChange={this.changeHandler("street")}
          />
          <input
            type="text"
            placeholder="City"
            defaultValue={this.state.city}
            onChange={this.changeHandler("city")}
          />
          <input
            type="text"
            placeholder="Country"
            defaultValue={this.state.country}
            onChange={this.changeHandler("country")}
          />
          <input
            type="text"
            placeholder="Postal Code"
            defaultValue={this.state.postal}
            onChange={this.changeHandler("postal")}
          />

          <input
            type="text"
            placeholder="Telephone Number"
            defaultValue={this.state.telNo}
            onChange={this.changeHandler("telNo")}
          />
          <input
            type="text"
            placeholder="Alternative Number"
            defaultValue={this.state.altNo}
            onChange={this.changeHandler("altNo")}
          />
          <input
            type="email"
            placeholder="E-Mail Adress"
            defaultValue={this.state.email}
            onChange={this.changeHandler("email")}
          />
          <input
            type="text"
            placeholder="Admin Name"
            defaultValue={this.state.adminName}
            onChange={this.changeHandler("adminName")}
          />
          <input
            type="password"
            placeholder="Admin Password"
            defaultValue={this.state.password}
            onChange={this.changeHandler("password")}
          />
          <h2>Please Select Your Property Facilities From the Below Options</h2>
          <label>Airport Transfer</label>
          <input
            type="checkBox"
            value={0}
            name="Airport Transfer"
            key="airport"
            onChange={this.changeCheckHandler}
          />
          <label>Swimming Pool</label>
          <input
            type="checkBox"
            value={1}
            name="Swimming Pool"
            key="pool"
            onChange={this.changeCheckHandler}
          />
          <label>Concierge Desk</label>
          <input
            type="checkBox"
            value={2}
            name="Concierge Desk"
            key="conceierge"
            onChange={this.changeCheckHandler}
          />
          <label>Wifi</label>
          <input
            type="checkBox"
            value={3}
            name="Wifi"
            key="wifi"
            onChange={this.changeCheckHandler}
          />
          <label>Room Service</label>
          <input
            type="checkBox"
            value={4}
            name="Room Service"
            key="roomSevice"
            onChange={this.changeCheckHandler}
          />
          <label>Tee and Coffee Facilities</label>
          <input
            type="checkBox"
            value={5}
            name="Tea and Coffee Facilities"
            key="teaCoffee"
            onChange={this.changeCheckHandler}
          />
          <label>Gymnasium</label>
          <input
            type="checkBox"
            value={6}
            name="Gymnasium"
            key="gym"
            onChange={this.changeCheckHandler}
          />
          <label>Bicyle Rental</label>
          <input
            type="checkBox"
            value={7}
            name="Bicycle Rental"
            key="bikeRental"
            onChange={this.changeCheckHandler}
          />

          <button type="submit" onSubmit={this.onSubmitHandler}>
            Submit Form
          </button>
        </form>
      </div>
    );
  }
}

export default PropertyAdd;
