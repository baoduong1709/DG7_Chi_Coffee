var express = require('express');
var router = express.Router()

const CreateCustomerControllers = require('../../../app/controllers/customers/Create_Customer_Controllers')
router.post('/', CreateCustomerControllers.create)
module.exports = router;