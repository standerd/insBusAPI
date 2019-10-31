import React from "react";
import "./propLogin.css";
import { Link } from "react-router-dom";

const propLogin = props => {
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
          Property Login
        </h1>
        {error}
        <form>
          <label htmlFor="e-mail">Email Address </label>
          <input
            type="email"
            id="e-mail"
            value={props.email}
            onChange={props.entityChange("entityMail")}
            placeholder="E-Mail Address"
            required={true}
          />
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            value={props.password}
            onChange={props.entityChange("entityPassword")}
            placeholder="Password"
          />
          <br></br>
          <button onClick={props.entityLogin}>Login</button>
        </form>

        <div className="oAuth">
          <p style={{ textAlign: "center" }}>Don't Have An Account</p>
          <div style={{ width: "100%", marginLeft: "auto" }}>
            <Link to="/addProperty">Register Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default propLogin;
