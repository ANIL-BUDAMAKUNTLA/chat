const express = require('express')

const router= express.Router();

const protectRoute = require('../middleware/protectRoute')
const user_controller=require('../controllers/user_controller.js')

router.get("/", protectRoute, user_controller.getUsersForSidebar);

module.exports=router;