const Product = require('../../../models/Product')
const cloudinary = require('cloudinary')
class DeleteProductControllers {
    async delete(req, res, next) {
        let _id = req.params._id
        
        const product = await Product.findById(_id)
        if (!product) {
            return res.status(404).send('Sản phẩm không tồn tại')
        }
        await Product.deleteOne({_id: _id})
                .then(() => {
                    cloudinary.uploader.destroy(product.product_image_name)
                    res.status(200).send('Xóa sản phẩm thành công')
                })
                .catch(() => {
                    res.status(500).send('Lỗi server')
                })
    }
};
module.exports = new DeleteProductControllers;