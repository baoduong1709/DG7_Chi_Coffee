var express = require('express');
var router = express.Router()

const CreateEmployeeControllers = require('../../../app/controllers/employees/Create_Employee_Controllers')
router.post('/', CreateEmployeeControllers.create)
module.exports = router;