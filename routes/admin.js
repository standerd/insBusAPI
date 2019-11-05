const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAuth = require("../middleware/isAuthAdmin");

// Controller handlers user registration and login.

router.get("/bookings", isAuth, adminController.getBookings);
router.get("/entities", isAuth, adminController.getEntities);
router.get("/users", isAuth, adminController.getUsers);

router.post("/login", adminController.postLogin);
router.post("/register", adminController.postRegister);

module.exports = router;
