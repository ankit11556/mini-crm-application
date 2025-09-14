const express = require("express");
const router = express.Router();

const {registerController,loginController,logout} = require('../controllers/User.controller')

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout",logout)

module.exports = router
