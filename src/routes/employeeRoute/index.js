var express = require('express');
var router = express.Router()
const CheckLogin =require('../../app/security/CheckLogin')
const CheckAdmin = require('../../app/security/CheckAdmin')

const ViewEmployeeListControllers = require('../../app/controllers/employees/View_EmployeeList_Controllers')
router.get('/', ViewEmployeeListControllers.view)

const CreateEmployeeControllers = require('../../app/controllers/employees/Create_Employee_Controllers')
router.post('/create',CheckLogin.check,CheckAdmin.check, CreateEmployeeControllers.create)

const ViewEmployeeDetailsControllers = require('../../app/controllers/employees/View_Employee_Details_Controllers')
router.get('/:id', ViewEmployeeDetailsControllers.view)

const LoginEmployeeControllers = require('../../app/controllers/employees/Login_Employee_Controllers')
router.post('/auth', LoginEmployeeControllers.login)

module.exports = router;