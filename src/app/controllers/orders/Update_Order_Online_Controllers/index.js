const Order = require('../../../models/Order')

class UpdateOrderOnlineControllers {
    async update(req, res) {
        let id = req.body.id
        let employee_id=req.data.id
        let employee_name=req.data.name
        let status=true
        let updatedAt = Date.now()
        console.log(updatedAt)    
        await Order.findById(id)
        .then(data => {
            if (data==null) {
                return res.status(404).send('Hóa đơn không tồn tại');
            }
            Order.findByIdAndUpdate(id, {
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