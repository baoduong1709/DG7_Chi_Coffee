var express = require('express');
var router = express.Router()

const LoginControllers = require('../../../app/controllers/employees/Login_Employee_Controllers')
router.post('/', LoginControllers.login)
module.exports = router;