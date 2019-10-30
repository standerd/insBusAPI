import React, { Component } from "react";
import BookingModal from "../userBookings/bookingModal/bookingModal";
import EditModal from "../userBookings/editDeleteModal/editModal";
import "./userBookings.css";

class UserBookings extends Component {
  state = {
    modalIsOpen: false,
    editModalOpen: false,
    bookings: null,
    propertyDetails: null,
    index: 0,
    editIndex: 0,
    checkIn: "",
    checkOut: "",
    guestCount: "",
    error: false,
    unavailable: false
  };

  //booking details modal, shows the booking as well as the property details
  openModal = e => {
    let index = e.target.value;
    let id = e.target.id;
    console.log(e.target.value);
    fetch(`/search/getProperty/${id}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ propertyDetails: result.details, index: index }, () => {
          console.log(this.state.propertyDetails);
          this.setState({ modalIsOpen: true });
        });
      })
      .catch(err => console.log(err));
  };

  //closes the booking modal.
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  //opens the edit modal, this displays the key booking info and allows the user to either ammend or change
  //their existing bookings.
  editModel = e => {
    let bookings = this.state.bookings;
    this.setState(
      {
        checkIn: bookings[e.target.value].checkInDate,
        checkOut: bookings[e.target.value].checkOutDate,
        guestCount: bookings[e.target.value].guestCount,
        editIndex: e.target.value
      },
      () => {
        this.setState({ editModalOpen: true });
      }
    );
  };

  //closes the edit modal.
  editModalClose = e => {
    this.setState({ editModalOpen: false });
  };

  //handles the input changes from the user on editing their booking dates or guest count.
  editChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  // ammend booking handler.
  ammendBooking = e => {
    e.preventDefault();

    //calculate the current occupation period to also be sent along with the newlys requested one, this is to
    //delete it from the entity avaialibily and to not take it into account during the availability check to be
    //performed.
    let currentOcc = [];

    let currentIn = new Date(
      this.state.bookings[this.state.editIndex].checkInDate
    );
    let currentOut = new Date(
      this.state.bookings[this.state.editIndex].checkOutDate
    );
    let currDur = parseInt((currentOut - currentIn) / (1000 * 3600 * 24));

    for (let i = 0; i < currDur; i++) {
      let myDate2 = currentIn.toLocaleDateString();
      currentOcc.push(myDate2);
      currentIn = new Date(currentIn.setDate(currentIn.getDate() + 1));
    }

    //for the ammending of the booking the entity which held the booking has to have their availability
    //updated, the below function puts the full date range in an array that get sent to the server to update.
    let occupation = [];

    let myFirstDate = new Date(this.state.checkIn);
    let myLastDate = new Date(this.state.checkOut);
    let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

    for (let i = 0; i < duration; i++) {
      let myDate = myFirstDate.toLocaleDateString();
      occupation.push(myDate);
      myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
    }

    //fetch request is sent to the server to ammend the booking
    fetch("/search/ammendBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookingID: this.state.bookings[this.state.editIndex]._id,
        occupation: occupation,
        currentOcc: currentOcc,
        checkIn: this.state.checkIn,
        checkOut: this.state.checkOut,
        guestCount: this.state.guestCount,
        entityID: this.state.bookings[this.state.editIndex].propertyId
      })
    })
      .then(res => {
        if (res.status === 404) {
          this.setState({ unavailable: true });
          throw new Error();
        } else if (res.status === 500) {
          this.setState({ error: true });
          throw new Error();
        }
        return res.json();
      })
      //on resdata received the modal is set to close and the userBookings page is refreshed to show the booking
      //has been removed.
      .then(resData => {
        console.log(resData.message);
        this.setState(
          {
            error: false,
            editModalOpen: false,
            editIndex: 0
          },
          () => this.fetchBookings()
        );
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: true
        });
      });
  };

  // delete booking handler.
  deleteBooking = e => {
    e.preventDefault();

    //for the deletion of the booking the entity which held the booking has to have their availability
    //updated, the below function puts the full date range in an array that get sent to the server to update.
    let occupation = [];

    let myFirstDate = new Date(
      this.state.bookings[this.state.editIndex].checkInDate
    );
    let myLastDate = new Date(
      this.state.bookings[this.state.editIndex].checkOutDate
    );
    let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

    for (let i = 0; i < duration; i++) {
      let myDate = myFirstDate.toLocaleDateString();
      occupation.push(myDate);
      myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
    }

    //fetch request is sent to the server to delete the booking
    fetch("/search/removeBooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookingID: this.state.bookings[this.state.editIndex]._id,
        occupation: occupation,
        entityID: this.state.bookings[this.state.editIndex].propertyId
      })
    })
      .then(res => res.json())
      //on resdata received the modal is set to close and the userBookings page is refreshed to show the booking
      //has been removed.
      .then(resData =>
        this.setState(
          {
            error: false,
            editModalOpen: false,
            editIndex: 0
          },
          () => this.fetchBookings()
        )
      )
      .catch(err => {
        console.log(err);
        this.setState({
          error: true
        });
      });
  };

  //fetch bookings function that fetches the booking on page load or on update.
  fetchBookings = () => {
    fetch("/search/myBookings", {
      headers: {
        Authorization: "Bearer " + this.props.token
      }
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ bookings: result.bookings }, () =>
          console.log(this.state.bookings)
        );
      });
  };

  componentDidMount() {
    this.fetchBookings();
  }

  render() {
    let myBookings;
    let bookingsArray = this.state.bookings;
    let message;

    bookingsArray === null ||
    bookingsArray === undefined ||
    bookingsArray.length === 0
      ? (message = (
          <h2 style={{ textAlign: "center", backgroundColor: "red" }}>
            You have no active bookings
          </h2>
        ))
      : (message = null);

    bookingsArray === null || bookingsArray === undefined
      ? (myBookings = <div className="lds-hourglass"></div>)
      : (myBookings = bookingsArray.map((key, index) => {
          return (
            <div key={key._id}>
              <div className="individualBooking">
                <div className="images">
                  <h3>{key.entityName}</h3>
                  <img src={"/" + key.imageSrc} alt="" />
                </div>
                <div className="details">
                  <h3>Destination: {key.destination}</h3>
                  <h3>Check In Date: {key.checkInDate}</h3>
                  <h3>Check Out Date: {key.checkOutDate}</h3>
                  <h3>Number of Guests: {key.guestCount}</h3>
                </div>
                {/* Check to see if the booking to load has check out date of less then the date today
                    if so the view and ammend buttons are disable as the booking is in the past. */}
                {new Date(key.checkOutDate).getTime() < new Date().getTime() ? (
                  <div className="buttons">
                    <button
                      disabled
                      style={{ backgroundColor: "white", color: "#81a7ee" }}
                    >
                      Past Booking
                    </button>
                  </div>
                ) : (
                  <div className="buttons">
                    <button
                      id={key.propertyId}
                      value={index}
                      onClick={this.openModal}
                    >
                      View Booking
                    </button>
                    <button id={key._id} value={index} onClick={this.editModel}>
                      Edit/Cancel Booking
                    </button>
                  </div>
                )}
              </div>

              {/* Modals are only diplayed if their state is set to display. */}
              <BookingModal
                modalIsOpen={this.state.modalIsOpen}
                closeModal={this.closeModal}
                propertyDetails={this.state.propertyDetails}
                bookingDetails={this.state.bookings[this.state.index]}
              />
              <EditModal
                modalIsOpen={this.state.editModalOpen}
                closeModal={this.editModalClose}
                checkIn={this.state.checkIn}
                checkOut={this.state.checkOut}
                guestCount={this.state.guestCount}
                editChange={this.editChange}
                deleteBooking={this.deleteBooking}
                ammendBooking={this.ammendBooking}
                data={this.state.bookings[this.state.editIndex]}
                unavailable={this.state.unavailable}
              />
            </div>
          );
        }));

    return (
      <div className="userBookings">
        <h1 style={{ textAlign: "center" }}>Booking Manager</h1>
        {message}
        {myBookings}
      </div>
    );
  }
}

export default UserBookings;
