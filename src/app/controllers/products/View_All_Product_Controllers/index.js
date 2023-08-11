const Product = require('../../../models/Product');
class ViewAllProductControllers {
    
    view(req, res,next) {
        let product_status =req.query.product_status
        if (product_status == null){
            Product.find({})
            .then(employees => {
                res.status(200).json(employees)
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
        }else{
            Product.find({product_status:product_status})
            .then(employees => {
                res.status(200).json(employees)
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
        }
    };
}
module.exports = new ViewAllProductControllers;