const Product = require('../../models/Product')
class AddControllers {
    add(req, res, next) {
        let product_name = req.body.product_name
        let id_product_type = req.body.id_product_type
        let old_price = req.body.old_price
        let new_price = req.body.new_price
        let product_image = req.body.product_image
        let product_status = req.body.product_status
        Product.findOne({
            product_name: product_name
        })
            .then(data => {
                if (data) {
                    res.json('san pham da ton tai')
                } else {
                    Product.create({
                        product_name: product_name,
                        id_product_type: id_product_type,
                        old_price: old_price,
                        new_price: new_price,
                        product_image: product_image,
                        product_status: product_status
                    })
                        .then(data => {

                            res.json('them san pham thanh cong')
                        })
                        .catch(err => {
                            res.json('loi server')
                        })
                }
            })
    }
};
module.exports = new AddControllers;