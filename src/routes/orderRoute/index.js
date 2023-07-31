const express = require('express')
const router = express.Router()
const CheckLogin =require('../../app/security/CheckLogin')

const CreateOrderOnlineController = require('../../app/controllers/orders/Create_Order_Controllers')
router.post('/create', CreateOrderOnlineController.create)

const UpdateOrderOnlineControllers = require('../../app/controllers/orders/Update_Order_Controllers')
router.put('/update',CheckLogin.check, UpdateOrderOnlineControllers.update)

module.exports = router