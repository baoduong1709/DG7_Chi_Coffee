const Product = require('../../models/Product')
class EditControllers {
    edit(req, res, next) {
        let id = req.body.id
        let product_name = req.body.product_name
        let id_product_type = req.body.id_product_type
        let old_price = req.body.old_price
        let new_price = req.body.new_price
        let product_image = req.body.product_image
        let product_status = req.body.product_status
        Product.findByIdAndUpdate(id, {
            product_name: product_name,
            id_product_type: id_product_type,
            old_price: old_price,
            new_price: new_price,
            product_image: product_image,
            product_status: product_status
        })
            .then(data => {
                res.json('sua thanh cong')
            })
            .catch(err => {
                res.json('loi')
            })
    }
};
module.exports = new EditControllers;