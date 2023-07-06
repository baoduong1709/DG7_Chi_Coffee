var express = require('express');
var router = express.Router()

const AddControllers = require('../../app/controllers/employees/Add_Controllers')
router.post('/', AddControllers.add)
module.exports = router;