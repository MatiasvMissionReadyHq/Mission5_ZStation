const express = require("express")
const router = express.Router()
const storeLocationController = require("../controllers/storeLocationController");
const stationDetailsController = require("../controllers/stationDetailsController");

router.get("/storeLocation", storeLocationController.getStoreLocation);
router.post("/stationDetailsById", stationDetailsController.getStationByID);

module.exports = router