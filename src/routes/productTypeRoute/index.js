const express = require('express');
const router = express.Router()

const ViewAllProductTypeControllers = require('../../app/controllers/product_types/View_All_Product_Type_Controllers')
router.get('/', ViewAllProductTypeControllers.view)
module.exports = router;