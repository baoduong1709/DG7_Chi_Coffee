const express = require('express')
const router = express.Router()
const CheckLogin =require('../../app/security/CheckLogin')
const CheckAdmin = require('../../app/security/CheckAdmin')

const uploadCloud = require('../../config/cloudinary');
const CreateProductControllers = require('../../app/controllers/products/Create_Product_Controllers')
router.post('/create',CheckLogin.check,CheckAdmin.check,uploadCloud.single('product_image'),CreateProductControllers.create)

module.exports = router;