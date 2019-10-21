const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.get("Authorization"));
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    console.log("No Error");
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "thisBookingsDotComSecret");
    console.log("verfied successfully" + decodedToken);
  } catch (err) {
    console.log(err);
  }

  if (!decodedToken) {
    console.log("Not Authenticated");
  }

  req.userId = decodedToken.userId;
  next();
};
