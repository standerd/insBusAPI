import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./userReg.css";

class UserReg extends Component {
  state = {
    name: "",
    surname: "",
    telNo: "",
    altNo: "",
    email: "",
    password: "",
    password2: "",
    error: false
  };

  // input change handler.
  onChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // registration submit handler, on succesfull registration the user is redirected to the home screen.
  // on login functionality user to be redirected to the users bookings page.
  submitReg = e => {
    //destructuring of state data.
    const { name, surname, telNo, altNo, email, password } = this.state;
    e.preventDefault();

    //before submitting request for registration to the server the password 1 and 2 fields are first
    //checked for a match, if they do not match the user is shown an eror, else registration takes place.
    if (this.state.password !== this.state.password2) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false }, () => {
        fetch("/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            surname,
            telNo,
            altNo,
            email,
            password
          })
        })
          .then(res => res.json())
          .then(result => {
            console.log(result.message + "-" + result.status);
            this.props.history.push("/");
          })
          .catch(err => console.log(err));
      });
    }
  };

  render() {
    return (
      <div className="userReg">
        <h1>User Registration Form</h1>
        <form>
          <input
            type="text"
            placeholder="First Name"
            onChange={this.onChange("name")}
            value={this.state.name}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={this.onChange("surname")}
            value={this.state.surname}
          />
          <input
            type="text"
            placeholder="Telephone Number"
            onChange={this.onChange("telNo")}
            value={this.state.telNo}
          />
          <input
            type="text"
            placeholder="Alternative Number"
            onChange={this.onChange("altNo")}
            value={this.state.altNo}
          />
          <input
            type="email"
            placeholder="E-Mail Address"
            onChange={this.onChange("email")}
            value={this.state.email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={this.onChange("password")}
            value={this.state.password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={this.onChange("password2")}
            value={this.state.password2}
          />
          <br></br>
          {this.state.error ? (
            <h3 style={{ color: "red" }}>
              Passwords Do Not Match Please Try Again
            </h3>
          ) : null}
          <br></br>
          <button type="submit" onClick={this.submitReg}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(UserReg);
