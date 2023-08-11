const Product = require('../../../models/Product')
const cloudinary = require('cloudinary')
class UpdateProductControllers {
    async update(req, res, next) {
        try{
            let _id = req.params._id
            const dataFile = req.file
            console.log(dataFile)
            const data = await Product.findById(_id)
            var product_image, product_image_name;
            if (dataFile === undefined) {
                product_image = data.product_image;
                product_image_name = data.product_image_name;
            } else {
                product_image = dataFile.path;
                product_image_name = dataFile.filename;
            }
            let product_name = req.body.product_name;
            let id_product_type = req.body.id_product_type
            let new_price = req.body.new_price
            let old_price = req.body.old_price
            let product_status = req.body.product_status
            let description = req.body.description
            if (
                id_product_type == null ||
                old_price == null ||
                new_price == null ||
                product_status == null) {
                return res.status(400).send('Vui lòng nhập đầy đủ thông tin')
            }else{
                Product.findByIdAndUpdate(_id,{
                    product_name: product_name,
                    id_product_type: id_product_type,
                    old_price: old_price,
                    new_price: new_price,
                    product_image: product_image,
                    product_image_name: product_image_name,
                    product_status: product_status,
                    description: description
                })
                .then(() => {
                    if (dataFile != undefined){cloudinary.uploader.destroy(data.product_image_name)}              
                    res.status(200).send('Cập nhật sản phẩm thành công')
                })
                .catch(() => {
                    if (dataFile != undefined){cloudinary.uploader.destroy(product_image_name)}
                    res.status(500).send('Lỗi server')
                })
            }
        }
        catch (err) {
            return res.status(500).send('Lỗi server')
        }
    }
};
module.exports = new UpdateProductControllers;