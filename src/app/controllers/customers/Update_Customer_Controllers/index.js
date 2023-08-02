const Customer = require('../../../models/Customer');
jwt = require('jsonwebtoken');
class UpdateCustommerControllers {
    async update(req, res, next) {
        let _id = req.data._id
        console.log(_id)
        let customer = req.body
        try {     
            const updatedCustomer = await Customer.findByIdAndUpdate(_id, customer, { new: true });       
            if (!updatedCustomer) {
                return res.status(404).send('Không tìm thấy người dùng');
            }
            res.json(updatedCustomer);
        } catch (err) {
            res.status(500).send('Lỗi cập nhật người dùng');
        }
    }
};
module.exports = new UpdateCustommerControllers;