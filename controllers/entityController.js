const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const KEY = require("../config/keys");
const bcrypt = require("bcrypt");
const Booking = require("../models/booking");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Google maps Geocoding api setup, used to get lat and lng from the entity
// registration adress. Lat, lng is used to display the properties on a map
// during the search results return.

const googleMapsClient = require("@google/maps").createClient({
  key: KEY.keys.google,
  Promise: Promise
});

exports.postRegister = (req, res, next) => {
  // destructure the incoming data from the client.

  const {
    email,
    suburb,
    name,
    entityType,
    street,
    city,
    country,
    postalCode,
    telNo,
    altNo,
    userName,
    password,
    facilities,
    description,
    offPeakRates,
    peakRates
  } = req.body;

  // geocode the address entered by the entity
  googleMapsClient
    .geocode({ address: street + "," + suburb + "," + city + "," + country })
    .asPromise()
    .then(response => {
      // check if an email exists in the database, if so advise the entity that the email already exists.
      Entity.findOne({ email: email })

        .then(entity => {
          if (entity) {
            return res.status(404).json({ message: "User Already Exists" });
          } else {
            // if the email was not found a new entity is stored to the database.
            bcrypt.hash(password, 12).then(hashedPW => {
              const newEntity = new Entity({
                name,
                entityType,
                street,
                suburb,
                city,
                country,
                postalCode,
                long: response.json.results[0].geometry.location.lng,
                lat: response.json.results[0].geometry.location.lat,
                telNo,
                altNo,
                email,
                userName,
                password: hashedPW,
                facilities,
                offPeakRates,
                peakRates,
                description
              });
              return newEntity.save(() => {
                res.status(200).json({ message: "Entity Succesfully Saved" });
              });
            });
          }
        })

        .catch(err => {
          console.log(err);
        });
    })

    .catch(err => {
      console.log(err);
    });
};

// entity image upload handler
exports.postUpload = (req, res, next) => {
  let id = req.body.id;
  let file = req.file.path;

  Entity.updateOne({ _id: id }, { $push: { images: file } })
    .then(result => {
      res.status(200).json({ image: file });
    })
    .catch(err => console.log(err));
};

// entity availability upload handler
exports.putAvailability = (req, res, next) => {
  let appendRange = req.body.dateRange;
  let id = req.body.id;

  Entity.updateOne(
    { _id: id },
    { $push: { availability: { $each: appendRange } } }
  )
    .then(result => {
      res.status(200).json({ image: "Change MAde" });
    })
    .catch(err => console.log(err));
};

exports.getBookings = (req, res, next) => {
  Booking.find({ propertyId: "5d9e18f13c0dd418c43bb793" })
    .then(result => {
      if (!result) {
        res.status(500).json({ data: "No Bookings Found for User" });
      } else {
        res.status(200).json({ bookings: result });
      }
    })
    .catch(err => console.log(err));
};

exports.postLogin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  let loadedEntity;

  Entity.findOne({ email: email })
    .then(entity => {
      if (!entity) {
        res.status(404).json({ message: "No User Found" });
      }

      loadedEntity = entity;
      return bcrypt.compare(password, entity.password);
    })
    .then(isMatch => {
      if (!isMatch) {
        res.status(404).json({ message: "Password Incorrect" });
      }
      const token = jwt.sign(
        { email: loadedEntity.email, entityId: loadedEntity._id },
        "thisBookingsDotComSecret",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        entityId: loadedEntity._id
      });
    })
    .catch(err => console.log(err));
};
