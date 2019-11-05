import React from "react";
import "./adminLogin.css";

//admin login Login name and password hardcoded in the db, only 1 admin user created for
//testing purposes, Admin cannot register on site and this would be a security issue,

const adminLogin = props => {
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
          Admin Login
        </h1>
        {error}
        <form onSubmit={props.onLogin}>
          <label htmlFor="name">Administrator Name</label>
          <input
            type="text"
            id="name"
            value={props.email}
            onChange={props.changeHandler("email")}
            placeholder="Admin Login Name"
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default adminLogin;
