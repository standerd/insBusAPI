const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAuth = require("../middleware/isAuthAdmin");

// Admin login and views routes. Functionality handled by the admin controller.

// admin view bookings route
router.get("/bookings", isAuth, adminController.getBookings);

// admin view all entities route
router.get("/entities", isAuth, adminController.getEntities);

// admin view all users route
router.get("/users", isAuth, adminController.getUsers);

//admin login route.
router.post("/login", adminController.postLogin);

//this route is not publically accessible via the website, it was however required to load a user.
router.post("/register", adminController.postRegister);

module.exports = router;
