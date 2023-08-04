const Order = require('../../../models/Order')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class ViewOrderListControllers {
    
    async view(req, res, next) {
        const status = req.query.status;
        try {
            let orders; 
            if (status === undefined) {
                orders = await Order.find();
            } else {
                orders = await Order.find({ status: status });
            }    
            if (orders.length === 0) {
                return res.status(404).send('Chưa có hóa đơn');
            }   
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).send('Lỗi server');
        }
    };
}
module.exports = new ViewOrderListControllers;