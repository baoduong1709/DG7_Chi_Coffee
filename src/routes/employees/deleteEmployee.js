var express = require('express');
var router = express.Router()

const DeleteEmployeeControllers = require('../../app/controllers/employees/Delete_Employee_Controllers')
router.delete('/', DeleteEmployeeControllers.delete)
module.exports = router;