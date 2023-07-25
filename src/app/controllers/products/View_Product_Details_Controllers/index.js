const Product = require('../../../models/Product')
const Product_type =require('../../../models/Product_type')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewProductDetailsControllers {
    
    async view(req, res, next) {
        let id =req.params.id
        console.log(id)
        const product= await Product.findById(id)
        if (!product) {
            return res.status(404).send('Sản phẩm không tồn tại')
        }else {
            Product_type.findById(product.id_product_type)
            .then(product_type =>{
                let product_type_name = product_type.name
                let data ={
                    product_type_name: product_type_name,
                    product_name: product.product_name,
                    id_product_type: product.id_product_type,
                    old_price: product.old_price,
                    new_price: product.new_price,
                    product_image: product.product_image,
                    product_image_name: product.product_image_name,
                    product_status: product.product_status,
                    description: product.description
                }
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
        }


    };
}
module.exports = new ViewProductDetailsControllers;