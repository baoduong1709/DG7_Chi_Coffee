const Product = require('../../../models/Product')
const Product_type =require('../../../models/Product_type')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewProductByProductTypeControllers {
    
    async view(req, res, next) {
        let product_status = req.query.product_status
        let product_name =req.params.name
        await Product_type.findOne({name: product_name})
        .then(product_type => {
            var id_product_type = product_type._id
            if (product_status==null){
                Product.find({id_product_type:id_product_type})
                .then(product => {
                    if(product == '') {
                        return res.status(404).send('Loại sản phẩm chưa có sản phẩm')
                    }
                    res.status(200).json(product)
                })
                .catch(err => {
                    res.status(500).send('Lỗi server')
                })
            }else{
                Product.find({id_product_type:id_product_type, product_status:product_status})
                .then(product => {
                    if(product == '') {
                        return res.status(404).send('Loại sản phẩm chưa có sản phẩm')
                    }
                    res.status(200).json(product)
                })
                .catch(err => {
                    res.status(500).send('Lỗi server')
                })
            }
        })
        .catch(err => {
            return res.status(404).send('Loại sản phẩm không tồn tại')
        })
    };
}
module.exports = new ViewProductByProductTypeControllers;