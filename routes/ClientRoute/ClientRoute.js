const express = require("express");
const ClientController = require("../../controllers/ClientController");
const router = express.Router();
const isAuth = require("../../middleware/isAuth")

//New client registration route.
router.post("/newClient", ClientController.postNewClient);

//New policy creation route.
router.post("/newPolicy", ClientController.postNewPolicy);

//New vehicle policy item creation route.
router.post("/newVehicle", ClientController.postNewVehicle);

//New property policy item creation route.
router.post("/newProperty", ClientController.postNewProperty);

//New All Risk General policy item creation route.
router.post("/newARGeneral", ClientController.postNewAllRiskGeneral);

//New All Risk Specified policy item creation route.
router.post("/newARSpecified", ClientController.postNewAllRiskSpec);

//DB Test Route
router.get("/dbTest", ClientController.dbTest);

router.get("/genPolicy" , ClientController.generatePolicy)

module.exports = router;
