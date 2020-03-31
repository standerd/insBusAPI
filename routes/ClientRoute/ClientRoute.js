const express = require("express");
const ClientController = require("../../controllers/ClientController");
const router = express.Router();

//New client registration route.
router.post("/newClient", ClientController.postNewClient);

//New client registration route.
router.post("/newPolicy", ClientController.postNewPolicy);

module.exports = router;
