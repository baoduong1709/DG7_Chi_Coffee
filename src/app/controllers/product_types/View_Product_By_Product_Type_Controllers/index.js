const Product = require('../../../models/Product')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewProductByProductTypeControllers {
    
    async view(req, res, next) {
        let id_product_type =req.params.id
        await Product.find({id_product_type:id_product_type})
        .then(product => {
            if(product == '') {
                return res.status(404).send('Loại sản phẩm không tồn tại')
            }
            res.status(200).json(product)
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })

    };
}
module.exports = new ViewProductByProductTypeControllers;