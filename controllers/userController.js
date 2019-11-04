const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//user login handler.
exports.postLogin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error("User not Found");
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isMatch => {
      if (!isMatch) {
        const error = new Error("Incorrect Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id, type: "user" },
        "thisBookingsDotComSecret",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id,
        type: "user"
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// post Register handles the user registration
exports.postRegister = (req, res, next) => {
  //destructure incoming data from client fetch request
  const { name, surname, email, password, telNo, altNo } = req.body;

  // see if the user database already contains a user with the email address, if
  //it exists a error is sent to the user, else the user is registered in the database
  User.findOne({ email: email })

    .then(user => {
      if (user) {
        const error = new Error("User Already Exists");
        error.statusCode = 401;
        throw error;
      } else {
        bcrypt
          .hash(password, 12)
          .then(hashedPW => {
            const newUser = new User({
              name,
              surname,
              email,
              password: hashedPW,
              telNo,
              altNo
            });
            return newUser.save();
          })
          .then(result => {
            res.status(200).json({ message: "Entity Succesfully Saved" });
          })
          .catch(err => res.status(500).json({ message: "Server Error" }));
      }
    })

    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// The post search fundtion is called when a user submits a search request, it receives a
// city parameter and return all documents from the data base that matched the search param.

exports.postSearch = (req, res, next) => {
  let city = req.body.city;

  Entity.find({ city: city })
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: "We could not find any properties for your search"
        });
      } else res.status(200).json({ results: data });
    })
    .catch(err => res.status(500).json({ message: "Server Error" }));
};

// Postbooking is called when the user submit the final booking form,
// this writes the booking to the bookings database, the bookings database
// contains both the user and property id's for ease of future queries

exports.postBooking = (req, res, next) => {
  // destructure the data coming in via the client fetch request
  const {
    userId,
    propertyId,
    checkInDate,
    checkOutDate,
    guestCount,
    totalBookingCost,
    bookingDate,
    street,
    city,
    country,
    postal,
    bookingArray,
    destination,
    imageSrc,
    entityName,
    email,
    name,
    contact
  } = req.body;

  // update the entity booked availability array to ensure that it cannot be booked a second time.
  Entity.updateOne(
    { _id: propertyId },
    { $push: { availability: { $each: bookingArray } } }
  ).catch(err => console.log(err));

  // write the booking to the database
  const newBooking = new Booking({
    userId,
    propertyId,
    checkInDate,
    checkOutDate,
    guestCount,
    totalBookingCost,
    bookingDate,
    street,
    city,
    country,
    postal,
    destination,
    imageSrc,
    entityName,
    name,
    email,
    contact
  });

  return (
    newBooking
      .save()

      //return the booking id to the client for confirmation purposes.
      .then(result => {
        res.status(200).json({
          message: "Booking Succesfully Created",
          booking: result._id
        });
      })
      .catch(err => console.log(err))
  );
};

//get booking function, get Request from the client, finds all bookings for the user in
//the database and send the a response containing all the usersbookings.
exports.getBookings = (req, res, next) => {
  Booking.find({ userId: req.userId })
    .then(result => {
      if (!result) {
        res.status(500).json({ data: "No Bookings Found for User" });
      } else {
        res.status(200).json({ bookings: result });
      }
    })
    .catch(err => console.log(err));
};

// if the users clicks on booking details from withing his booking manager, a request
//is sent here to fetch the property details for the user to see displayed.
exports.getProperty = (req, res, next) => {
  let property = req.params.propId;

  Entity.findOne({ _id: property })
    .then(result => res.status(200).json({ details: result }))
    .catch(err => console.log(err));
};

// booking delete function, if a user wishes to delete a booking, a request is sent from
//the client to this endpoint and the booking is deleterd.
exports.deleteBooking = (req, res, next) => {
  let bookId = req.body.bookingID;
  let occupation = req.body.occupation;
  let enityID = req.body.entityID;

  Booking.findOneAndDelete({ _id: bookId })
    .then(result => {
      //the booking is not only removed from the bookings collection but the entity availability data
      //is also updated to make the date range available again for future bookings.
      Entity.updateMany(
        { _id: enityID },
        { $pull: { availability: { $in: occupation } } },
        { multi: true }
      )
        .then(result =>
          res.status(200).json({ message: "Booking has been deleted" })
        )
        .catch(err =>
          res.status(404).json({ message: "Could not complete delete" })
        );
    })
    .catch(err =>
      res.status(404).json({ message: "Could not complete delete" })
    );
};

// users can ammend the dates and persons count of their bookings. This endpoint handles
// the users request data and updated the booking and entity database collections accordingly.
exports.ammendBooking = (req, res, next) => {
  let bookId = req.body.bookingID;
  let currentOcc = req.body.currentOcc;
  let occupation = req.body.occupation;
  let checkIn = req.body.checkIn;
  let checkOut = req.body.checkOut;
  let guestCount = req.body.guestCount;
  let entityID = req.body.entityID;

  Entity.findOne({ _id: entityID })
    .then(result => {
      //before doing the check for availability on the changed dates, the old booking dates are removed
      //from the availability data received from the Database and that is then used to compare against
      //else the user can never book within period booked by himself again.
      let isAvailable = false;
      let availableDates = result.availability;
      let index = availableDates.indexOf(currentOcc[0]);
      let length = currentOcc.length;
      availableDates.splice(index, length);

      for (let i = 0; i < availableDates.length; i++) {
        if (isAvailable) {
          break;
        }
        isAvailable = availableDates.includes(occupation[i]);
      }

      if (!isAvailable) {
        //remove the current occupation from the entity availability in the DB.
        Entity.updateOne(
          { _id: entityID },
          { $pull: { availability: { $in: currentOcc } } },
          { multi: true }
        ).catch(err => console.log(err));
        Entity.updateOne(
          { _id: entityID },
          { $push: { availability: { $each: occupation } } }
        ).catch(err => console.log(err));
        Booking.updateOne(
          { _id: bookId },
          {
            $set: {
              checkInDate: checkIn,
              checkOutDate: checkOut,
              guestCount: guestCount
            }
          }
        ).catch(err => console.log(err));
        res.status(200).json({ message: "We have space for you" });
      } else {
        res.status(404).json({ message: "We do not have space sorry" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Could not find the booking, please try again later."
      });
    });
};
