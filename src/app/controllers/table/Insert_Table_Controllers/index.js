const Table = require('../../../models/Table')
const Order = require('../../../models/Order')
// const { mutipleMongooseToObject } = require('../../../util/mongoose')
class InsertTableControllers {
    
    insert(req, res, next) {
        let table_name = req.body.table_name
        Order.findOne({table_id: table_name})
        .then(order => {
            Table.findOneAndUpdate({name: table_name,status:false},{
                order_id: order._id,
                status: true
            })
            .then(()=>{
                res.status(200).send('Tạo hóa đơn thành công')
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })

    };
}
module.exports = new InsertTableControllers;