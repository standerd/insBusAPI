import React, { Component, Fragment } from "react";
import LandingPage from "./components/landingPage/landingPage";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import Footer from "./components/footer/footer";
import { Route, Redirect, withRouter } from "react-router-dom";
import Booking from "../src/components/booking/booking";
import AddProperty from "../src/components/propertyAdd/propertyAdd";
import UserBookings from "../src/components/userBookings/userBookings";
import UserReg from "../src/components/userReg/userReg";
import UserLogin from "../src/components/userReg/userLogin/userLogin";
import PropertyMaintain from "../src/components/propertyAdd/propMaintain/propMaintain";
import Backdrop from "../src/components/Backdrop/Backdrop";
import Toolbar from "../src/components/Toolbar/Toolbar";
import Layout from "../src/components/Layout/Layout";

import "./App.css";

class App extends Component {
  state = {
    email: "",
    password: "",
    isAuth: false,
    token: null,
    userId: null,
    type: null,
    showBackdrop: false,
    showMobileNav: false,
    error: false
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
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.status);
        this.setState({
          isAuth: true,
          token: resData.token,
          userId: resData.userId,
          type: resData.type,
          error: false
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        localStorage.setItem("type", resData.type);

        const remainingTime = 60 * 60 * 1000;
        const tokenExpiry = new Date(new Date().getTime() + remainingTime);
        localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: true
        });
      });
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null, userId: null, type: "" });

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("type");

    this.props.history.push("/");
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

  mobileNavHandler = isOpen => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  render() {
    let routes;

    if (!this.state.isAuth) {
      routes = (
        <Fragment>
          <Route path="/" exact component={LandingPage} />
          <Route path="/regUser" component={UserReg} />
          <Route
            path="/loginUser"
            render={() => (
              <UserLogin
                {...this.props}
                onLogin={this.loginHandler}
                onLogout={this.logoutHandler}
                changeHandler={this.changeHandler}
                email={this.state.email}
                password={this.state.password}
                error={this.state.error}
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
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <Layout
          header={
            <Toolbar>
              <MainNavigation
                onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                onLogout={this.logoutHandler}
                isAuth={this.state.isAuth}
              />
            </Toolbar>
          }
          mobileNav={
            <MobileNavigation
              open={this.state.showMobileNav}
              mobile
              onChooseItem={this.mobileNavHandler.bind(this, false)}
              onLogout={this.logoutHandler}
              isAuth={this.state.isAuth}
            />
          }
        />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
