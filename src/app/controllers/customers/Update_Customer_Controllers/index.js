const Customer = require('../../../models/Customer');
class UpdateCustommerControllers {
    async update(req, res, next) {
        let _id = req.data_customer._id
        let customer = req.body
        try {     
            const updatedCustomer = await Customer.findByIdAndUpdate(_id, customer, { new: true });       
            if (!updatedCustomer) {
                return res.status(404).send('Không tìm thấy người dùng');
            }
            res.send('Cập nhật tài khoản thành công');
        } catch (err) {
            res.status(500).send('Lỗi cập nhật người dùng');
        }
    }
};
module.exports = new UpdateCustommerControllers;