const Product = require('../../../models/Product')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewProductByProductTypeControllers {
    
    async view(req, res, next) {
        let id_product_type =req.body.id_product_type
        await Product.find({id_product_type:id_product_type})
        .then(product => {
            if(!product){
                return res.status(404).send('Loại sản phẩm không tồn tại')
            }
            res.status(200).json(product)
            console.log(product)
        })
        .catch(err => {

        })

    };
}
module.exports = new ViewProductByProductTypeControllers;