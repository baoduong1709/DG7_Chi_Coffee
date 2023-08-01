const Customer = require('../../../models/Customer');
jwt = require('jsonwebtoken');
class UpdateCustommerControllers {
    async update(req, res, next) {
        try{ 
            let token = req.header('Authorization')
            if (token == undefined){
                return res.status(401).send('Chưa đăng nhập')
            }
            let _id = jwt.verify(token,'bao1709')
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
        catch (err) {
            return res.status(401).send('Token không hợp lệ')
        }


    }
};
module.exports = new UpdateCustommerControllers;