var express = require('express');
var router = express.Router()

const DeleteControllers = require('../../app/controllers/employees/Delete_Controllers')
router.use('/', DeleteControllers.delete)
module.exports = router;