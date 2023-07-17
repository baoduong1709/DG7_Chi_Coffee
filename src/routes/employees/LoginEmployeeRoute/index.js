var express = require('express');
var router = express.Router()

const LoginEmployeeControllers = require('../../../app/controllers/employees/Login_Employee_Controllers')
router.post('/', LoginEmployeeControllers.login)
module.exports = router;