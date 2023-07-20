const express = require('express')
const router = express.Router()
const ViewProductDetailsControllers = require('../../app/controllers/products/View_Product_Details_Controllers')
const ViewAllProductControllers = require('../../app/controllers/products/View_All_Product_Controllers')
const uploadCloud = require('../../config/cloudinary');
const CreateProductControllers = require('../../app/controllers/products/Create_Product_Controllers')
const CheckLogin =require('../../app/security/CheckLogin')
const CheckAdmin = require('../../app/security/CheckAdmin')






router.post('/create',CheckLogin.check,CheckAdmin.check,uploadCloud.single('product_image'),CreateProductControllers.create)
router.get('/', ViewAllProductControllers.view)
router.get('/:id', ViewProductDetailsControllers.view)

module.exports = router;