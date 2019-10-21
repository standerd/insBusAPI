import React, { Component, Fragment } from "react";
import LandingPage from "./components/landingPage/landingPage";
import NavBar from "./components/navbar/navBar";
import Footer from "./components/footer/footer";
import { Route, Redirect } from "react-router-dom";
import Booking from "../src/components/booking/booking";
import AddProperty from "../src/components/propertyAdd/propertyAdd";
import UserBookings from "../src/components/userBookings/userBookings";
import UserReg from "../src/components/userReg/userReg";
import UserLogin from "../src/components/userReg/userLogin/userLogin";
import PropertyMaintain from "../src/components/propertyAdd/propMaintain/propMaintain";

import "./App.css";

class App extends Component {
  state = {
    email: "",
    password: "",
    isAuth: false,
    token: null,
    userId: null,
    type: null
  };

  loginHandler = e => {
    e.preventDefault();

    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(resData => {
        this.setState(
          {
            isAuth: true,
            token: resData.token,
            userId: resData.userId,
            type: resData.type
          },
          () => console.log(this.state.userId)
        );
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("type", resData.type);

        const remainingTime = 60 * 60 * 1000;
        const tokenExpiry = new Date(new Date().getTime() + remainingTime);
        localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());
      })
      .catch(err => console.log(err));
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null, userId: null });

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("type");
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("tokenExpiry");
    const type = localStorage.getItem("type");

    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }

    const userId = localStorage.getItem("userId");

    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
      type: type
    });
  }

  changeHandler = name => e => {
    this.setState({ [name]: e.target.value });
  };

  render() {
    let routes;

    if (!this.state.isAuth) {
      routes = (
        <Fragment>
          <Route path="/" exact component={LandingPage} />
          <Route path="/userReg" component={UserReg} />
          <Route
            path="/userLogin"
            render={() => (
              <UserLogin
                {...this.props}
                onLogin={this.loginHandler}
                onLogout={this.logoutHandler}
                changeHandler={this.changeHandler}
                email={this.state.email}
                password={this.state.password}
              />
            )}
          />
          <Route path="/addproperty" component={AddProperty} />
        </Fragment>
      );
    } else if (this.state.isAuth) {
      routes = (
        <Fragment>
          <Route path="/" exact component={LandingPage} />
          <Route path="/book" component={Booking} />
          <Route path="/maintain" component={PropertyMaintain} />
          <Route
            path="/userBookings"
            render={() => (
              <UserBookings {...this.props} token={this.state.token} />
            )}
          />
          <Redirect to="/" />
        </Fragment>
      );
    }

    return (
      <div className="App">
        <NavBar />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
