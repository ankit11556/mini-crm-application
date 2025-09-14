const express =  require('express');
const router = express.Router();
const {protect} = require('../middleware/Auth.middleware')
const {addLead,deleteLead,editLead} = require('../controllers/Lead.controller')

router.post('/',protect,addLead)
router.delete('/:id',protect,deleteLead)
router.put('/:id',protect,editLead)

module.exports = router