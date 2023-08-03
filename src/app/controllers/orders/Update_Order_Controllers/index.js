const Order = require('../../../models/Order')
class UpdateOrderControllers {
    async update(req, res) {
        let _id = req.params._id
        let employee_id=req.data._id
        let employee_name=req.data.name
        let status=true
        const currentTime = new Date();
        const offsetHours = 7;
        currentTime.setHours(currentTime.getHours() + offsetHours);
        const iso8601String = currentTime.toISOString();
        const updatedAt = iso8601String
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
module.exports = new UpdateOrderControllers