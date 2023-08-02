const express = require('express')
const router = express.Router()
const CheckLoginEmployee =require('../../app/security/CheckLoginEmployee')
const CheckLoginCustomer = require('../../app/security/CheckLoginCustomer')

const CreateOrderController = require('../../app/controllers/orders/Create_Order_Controllers')
router.post('/create',CheckLoginCustomer.check, CreateOrderController.create)

const UpdateOrderOnlineController = require('../../app/controllers/orders/Update_Order_Controllers')
router.put('/:_id/update',CheckLoginEmployee.check, UpdateOrderOnlineController.update)

const ViewOrderHistoryController = require('../../app/controllers/orders/View_Order_History_Controllers')
router.get('/history',CheckLoginCustomer.check, ViewOrderHistoryController.view)

module.exports = router