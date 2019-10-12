const { validationResult } = require("express-validator");
const Entity = require("../models/enitySchema");
const mongoose = require("mongoose");

exports.postSearch = (req, res, next) => {
  let city = req.body.city;
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   console.log(errors);
  // }

  Entity.find({ city: city })
    .then(data => {
      if (data.length === 0) {
        res
          .status(404)
          .json({
            message: "We could not find any properties for your search"
          });
      } else res.status(200).json({ results: data });
    })
    .catch(err => res.status(500).json({ message: "Server Error" }));
};
