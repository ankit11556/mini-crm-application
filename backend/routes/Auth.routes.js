const express = require("express");
const router = express.Router();

const {registerController,loginController,logout} = require('../controllers/User.controller')
const {protect} = require('../middleware/Auth.middleware')

router.get("/check-auth",protect,(req,res)=>{
  res.json({user: req.user})
})

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout",logout)

module.exports = router
