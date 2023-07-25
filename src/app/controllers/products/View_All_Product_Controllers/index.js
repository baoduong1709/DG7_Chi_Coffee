const Product = require('../../../models/Product');
class ViewAllProductControllers {
    
    view(req, res,next) {
        Product.find({})
        .then(employees => {
            res.status(200).json(employees)
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })
    };
}
module.exports = new ViewAllProductControllers;