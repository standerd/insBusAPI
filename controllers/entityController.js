const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const KEY = require("../config/keys");

const googleMapsClient = require("@google/maps").createClient({
  key: KEY.keys.google,
  Promise: Promise
});

exports.postRegister = (req, res, next) => {
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
    facilities
  } = req.body;

  googleMapsClient
    .geocode({ address: street + "," + suburb + "," + city + "," + country })
    .asPromise()
    .then(response => {
      console.log(response.json.results[0].geometry.location);

      Entity.findOne({ email: email })

        .then(entity => {
          if (entity) {
            return res.status(404).json({ message: "User Already Exists" });
          } else {
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
              password,
              facilities
            });
            return newEntity.save(() => {
              res.status(200).json({ message: "Entity Succesfully Saved" });
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
