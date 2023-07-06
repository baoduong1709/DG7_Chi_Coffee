var express = require('express');
var router = express.Router()

const EditControllers = require('../../app/controllers/products/Edit_Controllers')
router.put('/', EditControllers.edit)
module.exports = router;