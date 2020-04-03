const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth");
const userController = require("../../controllers/userController");

// user search funcionality, viewing of bookings plus ammending and cancellations.

// handles user property search.
router.post("/searchProperty", userController.postSearch);

//finalises the user booking submission.
router.post("/finaliseBooking", userController.postBooking);

//only the /myBookings route is protected with auth middleware, the other routes following
//this route are not reachable from other parts of the app. I do not want to send the token
//back and forth if not specifically required. React routing is also setup to ensure that these
//cannot be accessed.

//returns user bookings from the database
router.get("/myBookings", isAuth, userController.getBookings);

//send a message email to the property from within the booking manager
router.post("/contact", userController.postContact);

//return the property details for the booking from within the booking manager
router.get("/getProperty/:propId", userController.getProperty);

//deletes a booking on request from the user.
router.post("/removeBooking", userController.deleteBooking);

//ammend the users booking, only dates and guest count can be edited.
router.post("/ammendBooking", userController.ammendBooking);

//returns user bookings from the database
router.get("/user", isAuth, userController.getUser);

//returns user bookings from the database
router.post("/booking", userController.postSingle);

//returns user bookings from the database
router.post("/push", userController.postNotification);

//returns user bookings from the database
router.post("/messages", userController.postMessages);

module.exports = router;
