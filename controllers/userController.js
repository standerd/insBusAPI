const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Booking = require("../models/booking");
const mongoose = require("mongoose");

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

exports.postBooking = (req, res, next) => {
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
    postal
  } = req.body;

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
    postal
  });

  return newBooking
    .save()

    .then(result => {
      res.status(200).json({ message: "Booking Succesfully Created" });
    })
    .catch(err => console.log(err));
};

exports.postRegister = (req, res, next) => {
  const { name, surname, email, password, telNo, altNo } = req.body;

  User.findOne({ email: email })

    .then(entity => {
      if (entity) {
        return res.status(404).json({ message: "User Already Exists" });
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
          .catch(err => console.log(err));
      }
    })

    .catch(err => {
      console.log(err);
    });
};
