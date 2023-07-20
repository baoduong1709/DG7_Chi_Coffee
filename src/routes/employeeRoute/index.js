var express = require('express');
var router = express.Router()
const CheckLogin =require('../../app/security/CheckLogin')
const CheckAdmin = require('../../app/security/CheckAdmin')

const UpdateEmployeeControllers = require('../../app/controllers/employees/Update_Employee_Controllers')
router.put('/:id/update',CheckLogin.check, CheckAdmin.check, UpdateEmployeeControllers.update)

const DeleteEmployeeControllers = require('../../app/controllers/employees/Delete_Employee_Controllers')
router.delete('/:id/delete',CheckLogin.check, CheckAdmin.check, DeleteEmployeeControllers.delete)
module.exports = router;