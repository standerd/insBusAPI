const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth");

const userController = require("../../controllers/userController");

// controller handles user bookings and search requests

router.post("/searchProperty", userController.postSearch);

router.get("/myBookings", isAuth, userController.getBookings);

router.get("/getProperty/:propId", userController.getProperty);

router.post("/finaliseBooking", userController.postBooking);

module.exports = router;
