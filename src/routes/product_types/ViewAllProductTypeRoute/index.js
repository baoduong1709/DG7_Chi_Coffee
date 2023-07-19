var express = require('express');
var router = express.Router()
const ViewProductByProductTypeControllers =require('../../../app/controllers/products/View_Product_By_Product_Type_Controllers')
const ViewAllProductTypeControllers = require('../../../app/controllers/product_types/View_All_Product_Type_Controllers')
router.get('/', ViewAllProductTypeControllers.view)
router.get('/:id', ViewProductByProductTypeControllers.view)
module.exports = router;