const express = require("express");
const ClientController = require("../../controllers/ClientController");
const router = express.Router();

//entity registration route.
router.post("/newClient", entityController.postNewClient);

module.exports = router;
