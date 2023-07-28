const express = require('express')
const router = express.Router()
const CheckLogin =require('../../app/security/CheckLogin')
const CheckAdmin = require('../../app/security/CheckAdmin')

const uploadCloud = require('../../config/cloudinary');
const CreateProductControllers = require('../../app/controllers/products/Create_Product_Controllers')
router.post('/create',CheckLogin.check,CheckAdmin.check,uploadCloud.single('product_image'),CreateProductControllers.create)

const ViewAllProductControllers = require('../../app/controllers/products/View_All_Product_Controllers')
router.get('/', ViewAllProductControllers.view)

const ViewProductDetailsControllers = require('../../app/controllers/products/View_Product_Details_Controllers')
router.get('/:_id', ViewProductDetailsControllers.view)

const UpdateProductControllers = require('../../app/controllers/products/Update_Product_Controllers')
router.put('/:_id/update',CheckLogin.check,CheckAdmin.check,uploadCloud.single('product_image'), UpdateProductControllers.update)

module.exports = router;