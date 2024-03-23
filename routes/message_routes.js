const express = require('express')

const router= express.Router();

const protectRoute = require('../middleware/protectRoute')
const message_controller=require('../controllers/message_controller')

router.post('/send/:id',protectRoute,message_controller.sendMessage)

router.get("/:id", protectRoute, message_controller.getMessages);

module.exports=router;