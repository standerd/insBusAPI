const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// Controller handlers user registration and login.

router.post("/register", userController.postRegister);

router.post("/login", userController.postLogin);

module.exports = router;
