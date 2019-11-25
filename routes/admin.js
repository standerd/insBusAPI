const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAuth = require("../middleware/isAuth");

// Admin login and views routes. Functionality handled by the admin controller.

// admin view bookings route
router.get("/bookings", isAuth, adminController.getBookings);

// admin view all entities route
router.get("/entities", isAuth, adminController.getEntities);

// admin view all users route
router.get("/users", isAuth, adminController.getUsers);

module.exports = router;
