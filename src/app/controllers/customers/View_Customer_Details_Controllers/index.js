const Customer = require('../../../models/Customer')
let jwt = require('jsonwebtoken')
class ViewCustomerDetailsControllers {
    
    async view(req, res, next) {
        try{
            let token = req.header('Authorization')
            if (token == undefined){
                return res.status(401).send('Chưa đăng nhập')
            }
            let _id = jwt.verify(token,'bao1709')
            try{
                const customer = await Customer.findById(_id)
                if (!customer) {
                    return res.status(404).send('Khách hàng không tồn tại')
                }
                await Customer.findById(_id,'name phone_number gmail gender date_of_birth address')
                .then(data => {
        
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(500).send('Lỗi server')
                })
            }
            catch(err) {
                return res.status(401).send('Id không hợp lệ')
            }
        }
        catch(err){
            return res.status(401).send('Token không hợp lệ')
        }

    };
}
module.exports = new ViewCustomerDetailsControllers;