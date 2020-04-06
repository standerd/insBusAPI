const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/UserController");
const isAuth = require("../../middleware/isAuth");

/* 
------------------------------------------------
Insurance Business User Login and Registration
------------------------------------------------
*/

//User registration - Only allowed to be registered by and administrator.
router.post("/register", UserController.postRegister);

//User login.
router.post("/login", UserController.postLogin);

//User Validate.
router.post("/validate", isAuth, UserController.postActivateAccount);

module.exports = router;
