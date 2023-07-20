const Product = require('../../../models/Product')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewProductDetailsControllers {
    
    async view(req, res, next) {
        let id =req.params.id
        console.log(id)
        const product= await Product.findById(id)
        if (!product) {
            return res.status(404).send('Sản phẩm không tồn tại')
        }
        await Product.findById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })

    };
}
module.exports = new ViewProductDetailsControllers;