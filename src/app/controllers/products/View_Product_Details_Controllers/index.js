const Product = require('../../../models/Product')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewProductDetailsControllers {
    
    async view(req, res, next) {
        let id =req.query._id
        console.log(id)
        const product= await Product.findById(id)
        if (!product) {
            return res.status(404).json({message:`Cannot find account with id=${id}. Maybe this account was not found!`});
        }
        await Product.findById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message:'Some errors occurred while retrieving accounts!'})
        })

    };
}
module.exports = new ViewProductDetailsControllers;