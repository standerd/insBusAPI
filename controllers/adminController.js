const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Booking = require("../models/booking");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//user login handler.
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
