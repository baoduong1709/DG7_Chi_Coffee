const Product = require('../../../models/Product');
class ViewAllProductControllers {
    
    view(req, res,next) {
        Product.find({})
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(500).json({message: 'Some errors occurred while retrieving accounts!'})
        })
    };
}
module.exports = new ViewAllProductControllers;