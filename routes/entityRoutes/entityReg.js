const express = require("express");
const entityController = require("../../controllers/entityController");
const router = express.Router();

router.post("/register", entityController.postRegister);

module.exports = router;
