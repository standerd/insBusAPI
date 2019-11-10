const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Booking = require("../models/booking");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//admoin login handler.
exports.postLogin = (req, res, next) => {
  console.log(req.body);
  let name = req.body.name;
  let password = req.body.password;

  Admin.findOne({ name: name })
    .then(admin => {
      if (!admin) {
        const error = new Error("User not Found");
        error.statusCode = 401;
        throw error;
      }

      if (password !== admin.password) {
        const error = new Error("Incorrect Password");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        { name: admin.name, type: "admin" },
        "thisBookingsDotComSecretAdmin",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        type: "admin"
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

//admin registration handler, this is not accessible through the app, needed this to get an admin
//user in the DB, can utilise this through Postman.
exports.postRegister = (req, res, next) => {
  let name = req.body.name;
  let password = req.body.password;

  const newUser = new Admin({
    name,
    password
  });
  newUser
    .save()

    .then(result => {
      res.status(200).json({ message: "Entity Succesfully Saved" });
    })
    .catch(err => res.status(500).json({ message: "Server Error" }));
};

//get all bookings for the admin user.
exports.getBookings = (req, res, next) => {
  Booking.find()
    .then(result => {
      if (!result) {
        res.status(500).json({ data: "No Bookings Found" });
      } else {
        res.status(200).json({ bookings: result });
      }
    })
    .catch(err => console.log(err));
};

//get all entities for the admin user.
exports.getEntities = (req, res, next) => {
  Entity.find()
    .then(result => {
      if (!result) {
        res.status(500).json({ data: "No Bookings Found" });
      } else {
        res.status(200).json({ entities: result });
      }
    })
    .catch(err => console.log(err));
};

//get all users for the admin user.
exports.getUsers = (req, res, next) => {
  User.find()
    .then(result => {
      if (!result) {
        res.status(500).json({ data: "No Bookings Found" });
      } else {
        res.status(200).json({ users: result });
      }
    })
    .catch(err => console.log(err));
};
