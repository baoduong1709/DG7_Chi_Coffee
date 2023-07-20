var express = require('express');
var router = express.Router()

const ViewAllProductControllers = require('../../../app/controllers/products/View_All_Product_Controllers')
router.get('/', ViewAllProductControllers.view)
module.exports = router;