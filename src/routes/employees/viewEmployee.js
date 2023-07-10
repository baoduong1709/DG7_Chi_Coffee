var express = require('express');
var router = express.Router()

const ViewEmployeeControllers = require('../../app/controllers/employees/View_Employee_Controllers')
router.get('/', ViewEmployeeControllers.view)
module.exports = router;