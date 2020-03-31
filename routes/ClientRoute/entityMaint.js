// const express = require("express");
// const entityController = require("../../controllers/ClientController");
// const router = express.Router();
// const isAuth = require("../../middleware/isAuth");

// //entity maintenance and viewing routes

// // handles the entity image upload function.
// router.post("/uploadImg", isAuth, entityController.postUpload);

// // entity availability manager route, handles submission of new unavailable dates.
// router.post("/maintainDates", isAuth, entityController.putAvailability);

// // return the bookings in the database to the entity home page.
// router.get("/bookings", isAuth, entityController.getBookings);

// // return the bookings in the database to the entity home page.
// router.get("/account", isAuth, entityController.getAccount);

// module.exports = router;
