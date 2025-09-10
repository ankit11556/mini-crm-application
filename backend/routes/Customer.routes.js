const express = require('express');
const router = express.Router()
const {addCustomers,getCustomers,getCustomerDetailView} = require('../controllers/Customer.controller')
const {protect} = require('../middleware/Auth.middleware')

router.post("/",protect,addCustomers)
router.get("/",protect,getCustomers)
router.get("/:id",protect,getCustomerDetailView)
module.exports = router