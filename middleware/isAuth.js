const jwt = require("jsonwebtoken");

//user authentication middleware, receives a Authorization header from the client
//and sets the req.userId to access in the app.

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    console.log("No Error");
  }

  const token = authHeader;

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "businessEmployeeLogin");
  } catch (err) {
    console.log(err);
  }

  if (!decodedToken) {
    console.log("Not Authenticated");
  }

  req.employeeNo = decodedToken.employeeNo;
  req.role = decodedToken.role;
  next();
};
