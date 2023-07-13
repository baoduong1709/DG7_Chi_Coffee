const Product = require('../../../models/Product');
class ViewProductControllers {
    
    view(req, res,next) {
        Product.find({})
        .then(employees => {
            res.status(200).json(employees)
        })
        .catch(err => {
            res.status(500).json({message: 'Some errors occurred while retrieving accounts!'})
        })
    };
}
module.exports = new ViewProductControllers;