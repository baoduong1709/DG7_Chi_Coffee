var express = require('express');
var router = express.Router()

const LoginCustomerControllers = require('../../app/controllers/customers/Login_Customer_Controllers')
router.post('/auth', LoginCustomerControllers.login)
const CreateCustomerControllers = require('../../app/controllers/customers/Create_Customer_Controllers')
router.post('/create', CreateCustomerControllers.create)
module.exports = router;