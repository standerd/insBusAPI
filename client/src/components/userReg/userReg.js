import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Google from "./googleLogin/googleLogin";
import Facebook from "./facebookLogin/facebookLogin";
import "./userReg.css";

//User registration component, this component manages it's own state as the user is
//not logged in automatically after registration is completed.
class UserReg extends Component {
  state = {
    name: "",
    surname: "",
    telNo: "",
    altNo: "",
    email: "",
    password: "",
    password2: "",
    error: false,
    error2: false
  };

  // input change handler.
  onChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // registration submit handler, on succesfull registration the user is redirected to the login screen.
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
            this.setState({ error: false, error2: false });
            this.props.history.push("/loginUser");
          })
          .catch(err => this.setState({ error2: true }));
      });
    }
  };

  render() {
    return (
      <div className="userReg">
        <div className="overlay2">
          <h1
            style={{
              textAlign: "center",
              color: "white",

              margin: "1% 1%"
            }}
          >
            Register
          </h1>

          <form onSubmit={this.submitReg}>
            <input
              type="text"
              placeholder="First Name"
              onChange={this.onChange("name")}
              value={this.state.name}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={this.onChange("surname")}
              value={this.state.surname}
              required
            />
            <input
              type="text"
              placeholder="Telephone Number"
              onChange={this.onChange("telNo")}
              value={this.state.telNo}
              required
            />
            <input
              type="text"
              placeholder="Alternative Number"
              onChange={this.onChange("altNo")}
              value={this.state.altNo}
              required
            />
            <input
              type="email"
              placeholder="E-Mail Address"
              onChange={this.onChange("email")}
              value={this.state.email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={this.onChange("password")}
              value={this.state.password}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={this.onChange("password2")}
              value={this.state.password2}
              required
            />
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
            <button className="regButton" type="submit">
              Register
            </button>
          </form>
          <p>Already Have An Account</p>
          <Link to="/loginUser">Login Here</Link>
          <h5 style={{ width: "100%", textAlign: "center" }}>Or Login With</h5>
          <div className="oAuth2" style={{ width: "100%" }}>
            <div className="googleButton">
              <Google responseGoogle={this.props.responseGoogle} />
              <Facebook responseFacebook={this.props.responseFacebook} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserReg);
