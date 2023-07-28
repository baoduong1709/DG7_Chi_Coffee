var express = require('express');
var router = express.Router()

const LoginCustomerControllers = require('../../app/controllers/customers/Login_Customer_Controllers')
router.post('/auth', LoginCustomerControllers.login)

const CreateCustomerControllers = require('../../app/controllers/customers/Create_Customer_Controllers')
router.post('/create', CreateCustomerControllers.create)

const UpdateCustomerControllers = require('../../app/controllers/customers/Update_Customer_Controllers')
router.put('/:_id/update', UpdateCustomerControllers.update)

module.exports = router;