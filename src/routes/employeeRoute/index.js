var express = require('express');
var router = express.Router()
const CheckLogin =require('../../app/security/CheckLogin')
const CheckAdmin = require('../../app/security/CheckAdmin')

const LoginEmployeeControllers = require('../../app/controllers/employees/Login_Employee_Controllers')
router.post('/auth', LoginEmployeeControllers.login)

const CreateEmployeeControllers = require('../../app/controllers/employees/Create_Employee_Controllers')
router.post('/create',CheckLogin.check,CheckAdmin.check, CreateEmployeeControllers.create)

const UpdateEmployeeControllers = require('../../app/controllers/employees/Update_Employee_Controllers')
router.put('/:id/update',CheckLogin.check, CheckAdmin.check, UpdateEmployeeControllers.update)

module.exports = router;