const Customer = require('../../../models/Customer');
class UpdateCustommerControllers {
    async update(req, res, next) {
        let _id = req.params._id
        let name = req.body.name
        let phone_number = req.body.phone_number
        let gender = req.body.gender
        let date_of_birth = req.body.date_of_birth
        let address = req.body.address
        if(name==null
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
};
module.exports = new UpdateCustommerControllers;