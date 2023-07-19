const ProductType = require('../../../models/Product_type');
class ViewAllProductTypeControllers {
    
    view(req, res,next) {
        ProductType.find({})
        .then(productTypes => {
            res.status(200).json(productTypes)
        })
        .catch(err => {
            res.status(500).json({message: 'Some errors occurred while retrieving accounts!'})
        })
    };
}
module.exports = new ViewAllProductTypeControllers;