var express = require('express');
var router = express.Router()
const CheckLogin =require('../../app/security/CheckLogin')
const CheckAdmin = require('../../app/security/CheckAdmin')

const UpdateEmployeeControllers = require('../../app/controllers/employees/Update_Employee_Controllers')
router.put('/:id/update',CheckLogin.check, CheckAdmin.check, UpdateEmployeeControllers.update)

module.exports = router;