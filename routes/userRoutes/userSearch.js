const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth");

const userController = require("../../controllers/userController");

// controller handles user bookings and search requests

router.post("/searchProperty", userController.postSearch);

router.get("/myBookings", isAuth, userController.getBookings);
router.post("/contact", userController.postContact);

router.get("/getProperty/:propId", userController.getProperty);

router.post("/finaliseBooking", userController.postBooking);

router.post("/removeBooking", userController.deleteBooking);

router.post("/ammendBooking", userController.ammendBooking);

module.exports = router;
