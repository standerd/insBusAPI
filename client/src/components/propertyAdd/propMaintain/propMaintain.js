import React, { Component } from "react";
import "./propMaintain.css";

class UploadImage extends Component {
  state = {
    files: "",
    preview: "",
    dateIn: "",
    dateOut: "",
    updateError: false,
    loaded: false
  };

  // handles the change of image name when the user selects and image
  onImageChange = e => {
    this.setState({ files: e.target.files[0] });
  };

  // date in change handler from calendar selector
  onDateInChange = e => {
    this.setState({ dateIn: e.target.value });
  };

  // date out change handler from the calendar selector
  onDateOutChange = e => {
    this.setState({ dateOut: e.target.value });
  };

  //dates are submitted to the database to be written into the availability field.

  // NB NEED TO STILL CODE THE CHECK IF AVAILABLE OR NOT TO AMMEND
  onDateSubmit = e => {
    e.preventDefault();
    let occupation = [];
    //on resubmit of the button the errors are reset.
    this.setState({ updateError: false, loaded: false });

    //set the date range that is included as an array with the request to the server.
    let myFirstDate = new Date(this.state.dateIn);
    let myLastDate = new Date(this.state.dateOut);
    let duration = parseInt((myLastDate - myFirstDate) / (1000 * 3600 * 24));

    for (let i = 0; i < duration; i++) {
      let myDate = myFirstDate.toLocaleDateString();
      occupation.push(myDate);
      myFirstDate = new Date(myFirstDate.setDate(myFirstDate.getDate() + 1));
    }

    //sending Auth header so the data array is sent as a formData object.
    const formData = new FormData();
    formData.append("dateRange", occupation);

    fetch("/entityMaint/maintainDates", {
      headers: {
        Authorization: "Bearer " + this.props.token
      },
      method: "POST",
      body: formData
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("No availability");
        }
        return res.json();
      })
      .then(result => {
        this.setState({ loaded: true });
      })
      .catch(err => {
        this.setState({ updateError: true });
      });
  };

  // upload image handler, shows a img preview on click of the uploaded image to
  // confirm succesfull upload.
  uploadImg = e => {
    e.preventDefault();

    // cannot send send images in application/json, so a new form object
    // is created to send the file data with the other normal body data.
    const formData = new FormData();
    formData.append("image", this.state.files);

    fetch("/entityMaint/uploadImg", {
      headers: {
        Authorization: "Bearer " + this.props.token
      },

      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(result => this.setState({ preview: result.image }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="maintain">
        <h1>Upload Images or Maintain Availability Of Your Property</h1>
        <div className="uploadImages">
          <h1>Please Upload Images of Your Property Below</h1>
          <form>
            <input className="file" type="file" onChange={this.onImageChange} />
            <button type="submit" onClick={this.uploadImg}>
              Upload Image
            </button>
            <br></br>
          </form>
          <img
            width="500px"
            height="auto"
            src={this.state.preview === "" ? "" : this.state.preview}
            alt=""
          />
        </div>
        <div className="availability">
          <h1>Please Update Your Availability For Any Manual Bookings</h1>
          <h1>Or Other Unavailable Dates</h1>
          <form>
            <label htmlFor="dateFrom">Date From</label>
            <input name="dateFrom" type="date" onChange={this.onDateInChange} />
            <label htmlFor="dateTo">Date To</label>
            <input name="dateTo" type="date" onChange={this.onDateOutChange} />
            <br></br>
            {this.state.updateError ? (
              <h2 style={{ color: "red" }}>
                There are already bookings for these dates. Please review
              </h2>
            ) : null}
            {this.state.loaded ? (
              <h2 style={{ color: "green" }}>Dates successfully added</h2>
            ) : null}
            <button type="submit" onClick={this.onDateSubmit}>
              Submit Dates
            </button>
            <br></br>
          </form>
        </div>
      </div>
    );
  }
}

export default UploadImage;
