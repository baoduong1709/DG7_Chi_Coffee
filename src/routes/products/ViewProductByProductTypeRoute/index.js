var express = require('express');
var router = express.Router()

const ViewProductByProductTypeControllers = require('../../../app/controllers/products/View_Product_By_Product_Type_Controllers')
router.get('/', ViewProductByProductTypeControllers.view)
module.exports = router;