var express = require('express');
var router = express.Router()

const ViewProductControllers = require('../../../app/controllers/products/View_All_Product_Controllers')
router.get('/', ViewProductControllers.view)
module.exports = router;