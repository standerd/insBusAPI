const { validationResult } = require("express-validator");

exports.postSearch = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
  }
};
