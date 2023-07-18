var express = require('express');
var router = express.Router()

const ViewEmployeeListControllers = require('../../../app/controllers/employees/View_EmployeeList_Controllers')
router.get('/', ViewEmployeeListControllers.view)
module.exports = router;