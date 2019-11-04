const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    console.log("No Error");
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "thisBookingsDotComSecretEntity");
  } catch (err) {
    console.log(err);
  }

  if (!decodedToken) {
    console.log("Not Authenticated");
  }

  req.entityId = decodedToken.entityId;
  next();
};
