var express = require('express');
var router = express.Router()

const EditControllers = require('../../app/controllers/employees/Update_Employee_Controllers')
router.put('/', EditControllers.update)
module.exports = router;