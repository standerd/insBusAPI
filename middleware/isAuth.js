const jwt = require("jsonwebtoken");

/* 
----------------------------------------------------------------------
Employee Auth Check Middleware, check the authorisation status of the 
employee and role profile to access only allowed routes
-----------------------------------------------------------------------
*/

module.exports = (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    console.log("No Error");
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "businessEmployeeLogin");
  } catch (err) {
    console.log(err);
  }

  if (!decodedToken) {
    console.log("Not Authenticated");
  }

  // set available params to be used inside the auth checked routes
  req.employeeNo = decodedToken.employeeNo;
  req.role = decodedToken.role;
  next();
};
