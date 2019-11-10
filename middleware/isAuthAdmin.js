const jwt = require("jsonwebtoken");

//admin authentication middleware, in order to ensure that a admin user can access all,
//bookings, users and entities information.

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    console.log("No Error");
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "thisBookingsDotComSecretAdmin");
  } catch (err) {
    console.log(err);
  }

  if (!decodedToken) {
    console.log("Not Authenticated");
  }
  next();
};
