const express = require("express")
const router = express.Router()
const storeLocationController = require("../controllers/storeLocationController")

router.get("/storeLocation", storeLocationController.getStoreLocation)

module.exports = router