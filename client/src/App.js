import React, { Component } from "react";
import LandingPage from "./components/landingPage/landingPage";
import NavBar from "./components/navbar/navBar";
import Footer from "./components/footer/footer";
import { LoadScript } from "@react-google-maps/api";
import { Switch, Route } from "react-router-dom";
import Booking from "../src/components/booking/booking";
import AddProperty from "../src/components/propertyAdd/propertyAdd";
import KEY from "./config/keys";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoadScript
          id="script-loader"
          libraries={["places"]}
          googleMapsApiKey={KEY.mapsKey}
        >
          <NavBar />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/addproperty" component={AddProperty} />
            <Route path="/book" component={Booking} />
          </Switch>
          <Footer />
        </LoadScript>
      </div>
    );
  }
}

export default App;
