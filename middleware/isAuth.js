const jwt = require("jsonwebtoken");

//user authentication middleware, receives a Authorization header from the client
//and sets the req.userId to access in the app.

module.exports = (req, res, next) => {
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

  req.userId = decodedToken.userId;
  req.propId = decodedToken.propId;
  req.isAdmin = decodedToken.isAdmin;
  next();
};
