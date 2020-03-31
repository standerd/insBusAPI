const express = require("express");
const ClientController = require("../../controllers/ClientController");
const router = express.Router();

//entity registration route.
router.post("/newClient", ClientController.postNewClient);

module.exports = router;
