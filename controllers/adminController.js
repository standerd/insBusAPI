const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const User = require("../models/client.model");
const Booking = require("../models/booking");
const mongoose = require("mongoose");

//get all bookings for the admin user.
exports.getBookings = (req, res, next) => {
  console.log("Request Received")
  if (!req.isAdmin) {
    // res.status(500).json({ data: "No Bookings Found" });
    Booking.find()
      .then(result => {
        if (!result) {
          res.status(500).json({ data: "No Bookings Found" });
        } else {
          res.status(200).json({ bookings: result });
        }
      })
      .catch(err => console.log(err));
  } else {
    Booking.find()
      .then(result => {
        if (!result) {
          res.status(500).json({ data: "No Bookings Found" });
        } else {
          res.status(200).json({ bookings: result });
        }
      })
      .catch(err => console.log(err));
  }
};

//get all entities for the admin user.
exports.getEntities = (req, res, next) => {
  if (!req.isAdmin) {
    res.status(500).json({ data: "No Bookings Found" });
  } else {
    Entity.find()
      .then(result => {
        if (!result) {
          res.status(500).json({ data: "No Bookings Found" });
        } else {
          res.status(200).json({ entities: result });
        }
      })
      .catch(err => console.log(err));
  }
};

//get all users for the admin user.
exports.getUsers = (req, res, next) => {
  if (!req.isAdmin) {
    res.status(500).json({ data: "No Bookings Found" });
  } else {
    User.find()
      .then(result => {
        if (!result) {
          res.status(500).json({ data: "No Bookings Found" });
        } else {
          res.status(200).json({ users: result });
        }
      })
      .catch(err => console.log(err));
  }
};
