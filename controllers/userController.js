const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
    entityName
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
    entityName
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

exports.getProperty = (req, res, next) => {
  let property = req.params.propId;

  Entity.findOne({ _id: property })
    .then(result => res.status(200).json({ details: result }))
    .catch(err => console.log(err));
};
