import React, { Component } from "react";
import "./allEntities.css";

//admin users can view a listing of all registered entities.
class AllEntities extends Component {
  state = {
    entities: null
  };

  componentDidMount() {
    fetch("/admin/entities", {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ entities: result.entities });
      });
  }

  render() {
    let myEntities;
    let entitiesArray = this.state.entities;
    let message;

    if (entitiesArray === undefined || entitiesArray === null) {
      message = <div className="lds-hourglass"></div>;
    } else if (entitiesArray.length === 0) {
      message = (
        <h2 style={{ textAlign: "center", backgroundColor: "red" }}>
          There are no active entities
        </h2>
      );
    }

    //entities are returned as an array and mapped to display the results.
    entitiesArray === null || entitiesArray === undefined
      ? (myEntities = null)
      : (myEntities = entitiesArray.map((key, index) => {
          return (
            <tr key={key._id}>
              <td>{key._id} </td>
              <td>{key.name}</td>
              <td>{key.city}</td>
              <td>{key.country}</td>
              <td>{key.telNo}</td>
              <td>{key.email}</td>
            </tr>
          );
        }));

    return (
      <div className="entBookings">
        {message}
        <div className="bookDisplay">
          <h1>Property Listing</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>City</th>
                <th>Country</th>
                <th>Contact No</th>
                <th>E-Mail</th>
              </tr>
            </thead>
            <tbody>{myEntities}</tbody>
          </table>
          <br></br>
        </div>
      </div>
    );
  }
}

export default AllEntities;
