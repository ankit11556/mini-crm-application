const express =  require('express');
const router = express.Router();
const {protect} = require('../middleware/Auth.middleware')
const {addLead} = require('../controllers/Lead.controller')

router.post('/',protect,addLead)

module.exports = router