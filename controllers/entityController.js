const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const KEY = require("../config/keys");
const Booking = require("../models/booking");
const User = require("../models/user");
const mongoose = require("mongoose");

// Google maps Geocoding api setup, used to get lat and lng from the entity
// registration adress. Lat, lng is used to display the properties on a map
// during the search results return.

const googleMapsClient = require("@google/maps").createClient({
  key: KEY.keys.google,
  Promise: Promise
});

// entity registration handler.
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
    password,
    facilities,
    description,
    rates,
    userId
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
            const error = new Error("User Already Exists");
            error.statusCode = 401;
            throw error;
          } else {
            // if the email was not found a new entity is stored to the database.

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
              facilities,
              rates,
              description,
              userId
            });
            return newEntity.save();
          }
        })
        .then(result => {
          User.updateOne(
            { _id: result.userId },
            { propId: result._id }
          ).catch(err => console.log(err));
          res.status(200).json({ message: "Entity Succesfully Saved" });
        })
        .catch(err => res.status(500).json({ message: "Server Error" }));
    })

    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// entity image upload handler
exports.postUpload = (req, res, next) => {
  let id = req.entityId;
  let file = req.file.path;

  Entity.updateOne({ _id: id }, { $push: { images: file } })
    .then(result => {
      res.status(200).json({ image: file });
    })
    .catch(err => console.log(err));
};

// entity availability upload handler. The entity can add unavailable dates to the availability
// array within the database collection. This might be due to a manual booking made by them or
// maybe a period in which the property will be closed and not available for booking.
exports.putAvailability = (req, res, next) => {
  let appendRange = req.body.dateRange;
  let id = req.entityId;

  Entity.findOne({ _id: id })
    .then(result => {
      let isAvailable = false;
      let availableDates = result.availability;

      //check for available dates and either update the db or send an error message
      //if the date are not available.
      for (let i = 0; i < availableDates.length; i++) {
        if (isAvailable) {
          break;
        }
        isAvailable = availableDates.includes(appendRange.split(",")[i]);
      }

      if (!isAvailable) {
        Entity.updateOne(
          { _id: id },
          { $push: { availability: { $each: appendRange.split(",") } } }
        ).catch(err => res.status(500).json({ message: "Cannot Update" }));
        res.status(200).json({ message: "Updated" });
      } else res.status(404).json({ message: "No Availability" });
    })

    .catch(err => {
      console.log(err);
    });
};

//get the enity bookings from the bookings collection in the database. The Entity ID to collect
// is contained in the Auth Header sent from the client.
exports.getBookings = (req, res, next) => {
  console.log("Got you");
  Booking.find({ propertyId: req.propId })
    .then(result => {
      if (!result) {
        res.status(500).json({ data: "No Bookings Found for User" });
      } else {
        res.status(200).json({ bookings: result });
      }
    })
    .catch(err => console.log(err));
};
