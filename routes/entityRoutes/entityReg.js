const express = require("express");
const entityController = require("../../controllers/entityController");
const router = express.Router();

// Controller deals with Entity Registrations and Login

router.post("/register", entityController.postRegister);

router.post("/entityLogin", entityController.postLogin);

module.exports = router;
