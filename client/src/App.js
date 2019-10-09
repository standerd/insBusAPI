import React, { Component } from "react";
import LandingPage from "./components/landingPage/landingPage";
import NavBar from "./components/navbar/navBar";
import Footer from "./components/footer/footer";
import { Route } from "react-router-dom";
import AddProperty from "../src/components/propertyAdd/propertyAdd";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route path="/" exact component={LandingPage} />
        <Route path="/addproperty" component={AddProperty} />
        <Footer />
      </div>
    );
  }
}

export default App;
