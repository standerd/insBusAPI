import React, { Component } from "react";
import "./allUsers.css";

//admin users are able to view a listing of all the registered users.
class AllUsers extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    fetch("/admin/users", {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ users: result.users });
      });
  }

  render() {
    let myUsers;
    let userArray = this.state.users;
    let message;

    if (userArray === undefined || userArray === null) {
      message = <div className="lds-hourglass"></div>;
    } else if (userArray.length === 0) {
      message = (
        <h2 style={{ textAlign: "center", backgroundColor: "red" }}>
          There are no registered users.
        </h2>
      );
    }

    //waits for the the user array to load from component did mount and then sets the display
    //field accordingly.
    userArray === null || userArray === undefined
      ? (myUsers = null)
      : (myUsers = userArray.map((key, index) => {
          return (
            <tr key={key._id}>
              <td>{key._id} </td>
              <td>{key.name}</td>
              <td>{key.surname}</td>
              <td>{key.email}</td>
              <td>{key.telNo}</td>
            </tr>
          );
        }));

    return (
      <div className="entBookings">
        <h1>User Listing</h1>
        {message}
        <div className="bookDisplay">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Surname</th>
                <th>E-Mail</th>
                <th>Tel No</th>
              </tr>
            </thead>
            <tbody>{myUsers}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllUsers;
