const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

//User authentication routes, login and registration.

//user registration route.
router.post("/register", userController.postRegister);

//user login route
router.post("/login", userController.postLogin);

//user google login route
router.post("/googlelogin", userController.postGoogleLogin);

//user facebook login route
router.post("/facebookLogin", userController.postFacebookLogin);

module.exports = router;
