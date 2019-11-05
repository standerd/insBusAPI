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
import PropertyLogin from "../src/components/propertyAdd/propLogin/propLogin";
import PropertyMaintain from "../src/components/propertyAdd/propMaintain/propMaintain";
import Backdrop from "../src/components/Backdrop/Backdrop";
import Toolbar from "../src/components/Toolbar/Toolbar";
import Layout from "../src/components/Layout/Layout";
import EntityBookings from "../src/components/entityBookings/entityBookings";
import AdminLogin from "../src/components/Admin/adminLogin/adminLogin";
import AdminBookings from "../src/components/Admin/allBookings/allBookings";
import AdminUsers from "../src/components/Admin/allUsers/allUsers";
import AdminEntities from "../src/components/Admin/allEntities/allEntities";
import AdminLand from "../src/components/Admin/adminLand/adminLand";

import "./App.css";

class App extends Component {
  state = {
    email: "",
    password: "",
    entityMail: "",
    entityPassword: "",
    isAuth: false,
    token: null,
    userId: null,
    showBackdrop: false,
    showMobileNav: false,
    error: false,
    type: "user"
  };

  //user login handler
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
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        //sets user login status and jwt data in local storage, this allows for the users details to be sent
        //inside the auth headers to access routes that are protected.
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
        this.props.history.push("/userBookings");
      })
      .catch(err => {
        this.setState({
          isAuth: false,
          authLoading: false,
          error: true
        });
      });
  };

  // user logout handler, remove the jwt data from local storage and logs the user out.
  logoutHandler = () => {
    this.setState({ isAuth: false, token: null, userId: null, type: "user" });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("type");

    this.props.history.push("/");
  };

  componentDidMount() {
    // authentication status is checked on component mount and if the users token had not yet expired
    // the is login status is set to having been logged in.
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

  //login change handler that handles the users email and password input data.
  changeHandler = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // handles the mobile navigation hamburger icons click.
  mobileNavHandler = isOpen => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  //if users click on the visisble space next to the mobile nav bar, the navbar is closed.
  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  // user type is set on clicking the appropriate navigation button, this sets the login and
  // registration navigation links accodingly.
  typeUpdate = e => {
    this.setState({ type: e.target.id });
  };

  // entity login function
  entityLogin = e => {
    e.preventDefault();
    fetch("/entity/entityLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.entityMail,
        password: this.state.entityPassword
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
        //sets entity login status and jwt data in local storage, this allows for the details to be sent
        //inside the auth headers to access routes that are protected.
        this.setState({
          isAuth: true,
          token: resData.token,
          userId: resData.entityId,
          type: resData.type,
          error: false
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.entityId);
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

  entityChangeHandler = name => e => {
    this.setState({ [name]: e.target.value });
  };

  //user login handler
  adminLoginHandler = e => {
    e.preventDefault();

    fetch("/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        //sets user login status and jwt data in local storage, this allows for the users details to be sent
        //inside the auth headers to access routes that are protected.
        this.setState({
          isAuth: true,
          token: resData.token,
          type: resData.type,
          error: false
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("type", resData.type);

        const remainingTime = 60 * 60 * 1000;
        const tokenExpiry = new Date(new Date().getTime() + remainingTime);
        localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          isAuth: false,
          authLoading: false,
          error: true
        });
      });
  };

  render() {
    let routes;

    // unauthenticated routes, login and reg routes are set, the type is set clicking the appriate
    // buttons on the landing page inside the search property side drawer, default is set to user.
    if (!this.state.isAuth) {
      routes = (
        <Fragment>
          <Route
            path="/"
            exact
            render={() => (
              <LandingPage
                {...this.props}
                type={this.state.type}
                typeUpdate={this.typeUpdate.bind(this)}
              />
            )}
          />
          <Route path="/regUser" component={UserReg} />
          <Route
            path="/loginUser"
            render={() => (
              <UserLogin
                {...this.props}
                onLogin={this.loginHandler}
                onLogout={this.logoutHandler}
                changeHandler={this.changeHandler}
                email={this.state.mail}
                password={this.state.password}
                error={this.state.error}
              />
            )}
          />
          <Route
            path="/adminLogin"
            render={() => (
              <AdminLogin
                {...this.props}
                onLogin={this.adminLoginHandler}
                onLogout={this.logoutHandler}
                changeHandler={this.changeHandler}
                email={this.state.mail}
                password={this.state.password}
                error={this.state.error}
              />
            )}
          />
          <Route path="/addproperty" component={AddProperty} />
          <Route
            path="/loginProperty"
            render={() => (
              <PropertyLogin
                {...this.props}
                entityLogin={this.entityLogin}
                onLogout={this.logoutHandler}
                entityChange={this.entityChangeHandler}
                email={this.state.entityMail}
                password={this.state.entityPassword}
                error={this.state.error}
              />
            )}
          />
        </Fragment>
      );

      //if authenticated and the user type is set to user, the user NavLinks and routes are set below.
    } else if (this.state.isAuth && this.state.type === "user") {
      routes = (
        <Fragment>
          <Route
            path="/"
            exact
            render={() => (
              <LandingPage
                {...this.props}
                type={this.state.type}
                typeUpdate={this.typeUpdate.bind(this)}
                isAuth={this.state.isAuth}
              />
            )}
          />
          <Route path="/book" component={Booking} />
          <Route
            path="/userBookings"
            render={() => (
              <UserBookings {...this.props} token={this.state.token} />
            )}
          />
          <Redirect to="/" />
        </Fragment>
      );

      //if authenticated and the user type is set to entity the routes and navigation
      //items are set accordingly.
    } else if (this.state.isAuth && this.state.type === "entity") {
      routes = (
        <Fragment>
          <Route
            path="/"
            exact
            render={() => (
              <EntityBookings {...this.props} token={this.state.token} />
            )}
          />
          <Route
            path="/maintain"
            render={() => (
              <PropertyMaintain {...this.props} token={this.state.token} />
            )}
          />
          <Redirect to="/" />
        </Fragment>
      );
    } else if (this.state.isAuth && this.state.type === "admin") {
      routes = (
        <Fragment>
          <Route path="/" exact component={AdminLand} />
          <Route
            path="/adminBookings"
            exact
            render={() => (
              <AdminBookings {...this.props} token={this.state.token} />
            )}
          />
          <Route
            path="/adminUsers"
            exact
            render={() => (
              <AdminUsers {...this.props} token={this.state.token} />
            )}
          />
          <Route
            path="/adminProps"
            exact
            render={() => (
              <AdminEntities {...this.props} token={this.state.token} />
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
                type={this.state.type}
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
              type={this.state.type}
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
