var express = require('express');
var router = express.Router()

const LoginCustomerControllers = require('../../../app/controllers/customers/Login_Customer_Controllers')
router.post('/', LoginCustomerControllers.login)
module.exports = router;