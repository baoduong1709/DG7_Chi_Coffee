
const Product = require('../../../models/Product')
const cloudinary = require('cloudinary')

class CreateProductControllers {
    async create(req, res, next) {
        const dataFile = req.file
        let product_name = req.body.product_name
        let id_product_type = req.body.id_product_type
        let old_price = req.body.old_price
        let new_price = req.body.new_price
        let product_image = req.file.path
        let product_status = req.body.product_status
        const checkProductname = await Product.findOne({product_name: product_name})
        if (product_name == null||
            id_product_type == null ||
            old_price == null ||
            new_price == null ||
            product_image == null ||
            product_status == null) {
                if (dataFile) cloudinary.uploader.destroy(dataFile.filename)
                return res.status(400).send('Vui lòng nhập đầy đủ thông tin')
            }else if(checkProductname){
                if (dataFile) cloudinary.uploader.destroy(dataFile.filename)
                return res.status(409).send('Tên sản phẩm đã tồn tại')
            }else{
                Product.create({
                    product_name: product_name,
                    id_product_type: id_product_type,
                    old_price: old_price,
                    new_price: new_price,
                    product_image: product_image,
                    product_status: product_status
                })
                .then(data => {
                    res.status(200).send('Thêm sản phẩm thành công')
                })
                .catch(err => {
                    if (dataFile) cloudinary.uploader.destroy(dataFile.filename)
                    res.status(500).send('Lỗi server')
                })
            }
        };
    }
module.exports = new CreateProductControllers;