const express = require('express');
const router = express.Router()

const ViewAllProductTypeControllers = require('../../app/controllers/product_types/View_All_Product_Type_Controllers')
router.get('/', ViewAllProductTypeControllers.view)

const ViewProductByProductTypeControllers =require('../../app/controllers/product_types/View_Product_By_Product_Type_Controllers')
router.get('/:id', ViewProductByProductTypeControllers.view)

module.exports = router;