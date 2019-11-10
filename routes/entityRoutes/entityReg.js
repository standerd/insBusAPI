const express = require("express");
const entityController = require("../../controllers/entityController");
const router = express.Router();

//entity registration and login routes

//entity registration route.
router.post("/register", entityController.postRegister);

//entity login route.
router.post("/entityLogin", entityController.postLogin);

module.exports = router;
