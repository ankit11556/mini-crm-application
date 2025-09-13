const express = require('express');
const router = express.Router()
const {protect} = require("../middleware/Auth.middleware")
const {getDashboardStats} = require("../controllers/Dashboard.controller")

router.get("/",protect,getDashboardStats)

module.exports = router