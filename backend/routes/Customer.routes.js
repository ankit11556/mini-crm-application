const express = require('express');
const router = express.Router()
const {addCustomers} = require('../controllers/Customer.controller')
const {protect} = require('../middleware/Auth.middleware')

router.post("/",protect,addCustomers)

module.exports = router