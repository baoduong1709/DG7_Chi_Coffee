var express = require('express');
var router = express.Router()
const ViewProductDetailsControllers = require('../../../app/controllers/products/View_Product_Details_Controllers')
const ViewAllProductControllers = require('../../../app/controllers/products/View_All_Product_Controllers')
router.get('/', ViewAllProductControllers.view)
router.get('/:id', ViewProductDetailsControllers.view)
module.exports = router;