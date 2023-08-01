const express = require('express')
const router = express.Router()
const CheckLogin =require('../../app/security/CheckLogin')

const CreateOrderOnlineController = require('../../app/controllers/orders/Create_Order_Controllers')
router.post('/create', CreateOrderOnlineController.create)

const UpdateOrderOnlineController = require('../../app/controllers/orders/Update_Order_Controllers')
router.put('/:_id/update',CheckLogin.check, UpdateOrderOnlineController.update)

const ViewOrderHistoryController = require('../../app/controllers/orders/View_Order_History_Controllers')
router.get('/history', ViewOrderHistoryController.view)

module.exports = router