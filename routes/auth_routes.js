const express = require('express')

const router= express.Router();

const auth_controller=require('../controllers/auth_controller')

router.post('/signup',auth_controller.signup)

router.post('/login',auth_controller.login)

router.post('/logout',auth_controller.logout)

module.exports=router;