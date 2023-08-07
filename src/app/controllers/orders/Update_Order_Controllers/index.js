const Order = require('../../../models/Order')
const moment = require('moment')
class UpdateOrderOnlineControllers {
    async update(req, res) {
        let _id = req.params._id
        let employee_id=req.data._id
        let employee_name=req.data.name
        let status=true
        const currentTime = new Date()
        const updatedAt = moment(currentTime).utcOffset(7).format('DD/MM/YYYY HH:mm');
        await Order.findById(_id)
        .then(data => {
            if (data==null) {
                return res.status(404).send('Hóa đơn không tồn tại');
            }
            Order.findByIdAndUpdate(_id, {
                employee_id: employee_id,
                employee_name: employee_name,
                status: status,
                updatedAt: updatedAt
            })
            .then(() => {
                res.status(200).send('Cập nhật thành công')
            })
            .catch(() => {
                res.status(500).send('Lỗi server')
            })
        })
        .catch(() => {
            return res.status(404).send('Hóa đơn không tồn tại');
        });

    }
}
module.exports = new UpdateOrderOnlineControllers