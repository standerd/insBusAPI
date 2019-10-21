import React from "react";
import "./userLogin.css";

const userLogin = props => {
  return (
    <div className="userLogin">
      <input
        type="email"
        value={props.email}
        onChange={props.changeHandler("email")}
        placeholder="E-Mail Address"
      />
      <br></br>
      <input
        type="password"
        value={props.password}
        onChange={props.changeHandler("password")}
        placeholder="Password"
      />
      <br></br>
      <button onClick={props.onLogin}>Login</button>
      <br></br>
      <button onClick={props.onLogout}>Logout</button>
    </div>
  );
};

export default userLogin;
