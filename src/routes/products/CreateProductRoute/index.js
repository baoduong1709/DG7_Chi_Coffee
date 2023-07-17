var express = require('express');
var router = express.Router()

const CreateProductControllers = require('../../../app/controllers/products/Create_Product_Controllers')
router.post('/', CreateProductControllers.create)
module.exports = router;