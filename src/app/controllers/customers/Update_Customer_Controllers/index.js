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
            let name = req.body.name
            let phone_number = req.body.phone_number
            let gender = req.body.gender
            let date_of_birth = req.body.date_of_birth
            let address = req.body.address
            try{
                const customer = await Customer.findById(_id)
                if (!customer) {
                    return res.status(404).send('Khách hàng không tồn tại')
                }else if(name==null
                    || gender==null 
                    || address==null
                    || date_of_birth == null){
                    return res.status(400).json('Nhập thêm thông tin')
                }else{
                    Customer.findByIdAndUpdate(_id,{
                        name: name,
                        gender: gender,
                        date_of_birth: date_of_birth,
                        phone_number: phone_number,
                        address: address,
                    })
                    .then(() => {
                        res.status(200).json('Cập nhật tài khoản thành công');
                    })
                    .catch(() => {
                        res.status(500).json('Lỗi server')
                    })
                }
            }
            catch (err) {
                return res.status(401).send('Id không hợp lệ')
            }
        }
        catch (err) {
            return res.status(401).send('Token không hợp lệ')
        }


    }
};
module.exports = new UpdateCustommerControllers;