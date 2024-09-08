const express = require("express")
const router = express.Router()
const routesController = require("../controllers/routesController")

router.get("/", routesController.controller)

module.exports = router