const Order = require('../../../models/Order')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewOrderHistoryControllers {
    
    async view(req, res, next) {
        try{
            let _id = req.data_customer._id
            await Order.find({customer_id: _id})
            .then(order => {
                if(order == '') {
                    return res.status(404).send('Khách hàng chưa có đơn đặt hàng')
                }
                res.status(200).json(order)
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
        }
        catch{
            return res.status(401).send('Token không hợp lệ')
        }
    };
}
module.exports = new ViewOrderHistoryControllers;