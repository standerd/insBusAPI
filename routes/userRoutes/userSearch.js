const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");

router.post("/searchProperty", userController.postSearch);

router.post("/finaliseBooking", userController.postBooking);

module.exports = router;
