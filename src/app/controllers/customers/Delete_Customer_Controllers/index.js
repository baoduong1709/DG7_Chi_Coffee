const Customer = require('../../../models/Customer')
class DeleteCustomerControllers {
    async delete(req, res, next) {
        let _id = req.params._id
        
        const customer= await Customer.findById(_id)
        if (!customer) {
            return res.status(404).send('Khách hàng không tồn tại')
        }
        await Employee.deleteOne({_id: _id})
                .then(data => {
                    res.status(200).send('Xóa khách hàng thành công')
                })
                .catch(err => {
                    res.status(500).send('Lỗi server')
                })
    }
};
module.exports = new DeleteCustomerControllers;