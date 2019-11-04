const express = require("express");
const entityController = require("../../controllers/entityController");
const router = express.Router();
const isAuth = require("../../middleware/isAuthEnt");

// Controller handels all requests relating to the Entity maintaining their profile.

router.post("/uploadImg", entityController.postUpload);
router.put("/maintainDates", entityController.putAvailability);

router.get("/bookings", isAuth, entityController.getBookings);

module.exports = router;
