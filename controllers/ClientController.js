const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const KEY = require("../config/keys");
const Booking = require("../models/booking");
const User = require("../models/user");
const mongoose = require("mongoose");



// New client registration
exports.postNewClient = (req, res, next) => {
  console.log(req.body);
};

// entity image upload handler
exports.postUpload = (req, res, next) => {
  let id = req.propId;
  let file = req.file.path;

  Entity.updateOne({ _id: id }, { $push: { images: file } })
    .then(result => {
      res.status(200).json({ image: file });
    })
    .catch(err => console.log(err));
};
