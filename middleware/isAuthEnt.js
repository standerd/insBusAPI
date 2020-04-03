const jwt = require("jsonwebtoken");

//entity authentication middleware, in order to ensure that a user cannot access any entity routes,
//the entity middleware is set with a different secret, the incoming auth header is decoded and the
//entity ID is set for use to get bookings and also for maintaining property details.

module.exports = (req, res, next) => {
  console.log("Request received")
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    console.log("No Error");
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "thisBookingsDotComSecret");
  } catch (err) {
    console.log(err);
  }

  if (!decodedToken) {
    console.log("Not Authenticated");
  }
  console.log(decodedToken);

  req.entityId = decodedToken.propId;
  next();
};
