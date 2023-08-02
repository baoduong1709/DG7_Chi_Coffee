var express = require('express');
var router = express.Router()
const CheckLoginEmployee =require('../../app/security/CheckLoginEmployee')
const CheckAdmin = require('../../app/security/CheckAdmin')

const ViewEmployeeListControllers = require('../../app/controllers/employees/View_Employee_List_Controllers')
router.get('/', ViewEmployeeListControllers.view)

const ViewEmployeeDetailsControllers = require('../../app/controllers/employees/View_Employee_Details_Controllers')
router.get('/:_id', ViewEmployeeDetailsControllers.view)

const LoginEmployeeControllers = require('../../app/controllers/employees/Login_Employee_Controllers')
router.post('/auth', LoginEmployeeControllers.login)

const CreateEmployeeControllers = require('../../app/controllers/employees/Create_Employee_Controllers')
router.post('/create',CheckLoginEmployee.check,CheckAdmin.check, CreateEmployeeControllers.create)

const UpdateEmployeeControllers = require('../../app/controllers/employees/Update_Employee_Controllers')
router.put('/:_id/update',CheckLoginEmployee.check, CheckAdmin.check, UpdateEmployeeControllers.update)

const DeleteEmployeeControllers = require('../../app/controllers/employees/Delete_Employee_Controllers')
router.delete('/:_id/delete',CheckLoginEmployee.check, CheckAdmin.check, DeleteEmployeeControllers.delete)

module.exports = router;