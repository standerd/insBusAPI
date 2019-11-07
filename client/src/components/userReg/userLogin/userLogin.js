import React from "react";
import "./userLogin.css";
import Google from "../googleLogin/googleLogin";
import Facebook from "../facebookLogin/facebookLogin";
import { Link } from "react-router-dom";

// Standard user login component allowing the user to login with their email and password
// setup during the user registration page.
const userLogin = props => {
  let error;
  props.error
    ? (error = <p className="error">Invalid Login Details Please Try Again</p>)
    : (error = null);
  return (
    <div className="userLogin">
      <div className="overlay">
        <h1
          style={{
            textAlign: "center",
            color: "white",
            margin: "1% 1%"
          }}
        >
          Login
        </h1>
        {error}
        <form onSubmit={props.onLogin}>
          <label htmlFor="e-mail">Email Address </label>
          <input
            type="email"
            id="e-mail"
            value={props.email}
            onChange={props.changeHandler("email")}
            placeholder="E-Mail Address"
            required={true}
          />
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            value={props.password}
            onChange={props.changeHandler("password")}
            placeholder="Password"
            required={true}
          />
          <br></br>
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>

        <div className="oAuth">
          <p style={{ textAlign: "center" }}>Don't Have An Account</p>
          <div style={{ width: "100%", marginLeft: "auto" }}>
            <Link to="/regUser">Register Here</Link>
          </div>

          <h5 style={{ width: "100%", textAlign: "center" }}>Or Login With</h5>
          <Google responseGoogle={props.responseGoogle} />
          <Facebook responseFacebook={props.responseFacebook} />
        </div>
      </div>
    </div>
  );
};

export default userLogin;
