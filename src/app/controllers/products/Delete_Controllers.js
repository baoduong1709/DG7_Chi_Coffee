const Product = require('../../models/Product')
class DeleteControllers {
    delete(req, res, next) {
        let id = req.body.id
        Product.deleteOne({
            _id: id
        })
            .then(data => {
                res.json('xoa san pham thanh cong')
            })
            .catch(err => {
                res.json('loi')
            })
    }
};
module.exports = new DeleteControllers;