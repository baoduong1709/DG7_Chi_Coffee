const Order = require('../../../models/Order')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewOrderListControllers {
    
    async view(req, res, next) {
        await Order.find()
            .then(order => {
                if(order == '') {
                    return res.status(404).send('Chưa có hóa đơn')
                }
                res.status(200).json(order)
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
    };
}
module.exports = new ViewOrderListControllers;