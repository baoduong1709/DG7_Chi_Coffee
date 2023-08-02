const Customer = require('../../../models/Customer')
let jwt = require('jsonwebtoken')
class ViewCustomerDetailsControllers {
    
    async view(req, res, next) {
        let _id = req.data._id
        try{
            const customer = await Customer.findById(_id)
            if (!customer) {
                return res.status(404).send('Khách hàng không tồn tại')
            }
            await Customer.findById(_id,'name phone_number gmail gender date_of_birth address')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(() => {
                res.status(500).send('Lỗi server')
            })
        }
        catch(err) {
            return res.status(401).send('Id không hợp lệ')
        }

    };
}
module.exports = new ViewCustomerDetailsControllers;