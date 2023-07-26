const express = require('express')
const router = express.Router()

const CreateOrderController = require('../../app/controllers/orders/Create_Order_Online_Controllers')
router.post('/create', CreateOrderController.create)

module.exports = router