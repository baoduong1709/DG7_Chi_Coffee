var express = require('express');
var router = express.Router()

const LoginControllers = require('../../app/controllers/employees/Login_Controllers')
router.post('/', LoginControllers.login)
router.get('/', LoginControllers.view)
module.exports = router;