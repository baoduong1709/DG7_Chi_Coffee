var express = require('express');
var router = express.Router()

const EditControllers = require('../../app/controllers/employees/Edit_Controllers')
router.put('/', EditControllers.edit)
module.exports = router;