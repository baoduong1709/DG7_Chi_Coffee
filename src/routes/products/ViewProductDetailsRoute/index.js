var express = require('express');
var router = express.Router()

const ViewProductDetailsControllers = require('../../../app/controllers/products/View_Product_Details_Controllers')
router.get('/', ViewProductDetailsControllers.view)
module.exports = router;