const Customer = require('../../../models/Customer');
const CryptoJS = require("crypto-js");
class CreateCustommerControllers {
    async create(req, res, next) {
        let name = req.body.name
        let phone_number = req.body.phone_number
        let gmail = req.body.gmail
        let gender = req.body.gender
        let date_of_birth = req.body.date_of_birth
        let address = req.body.address
        let password = CryptoJS.AES.encrypt(req.body.password,'duonghuybao').toString()
        const checkGmail = await Customer.findOne({gmail: gmail})
        if(name==null
            || gender==null 
            || address==null
            || gmail==null 
            || date_of_birth == null
            || password==null){
            return res.status(400).json('Nhập thêm thông tin')
        }else if(checkGmail){
            return res.status(409).json('Gmail đã tồn tại')

        }else{
            Customer.create({
                gmail:gmail,
                password:password ,
                name: name,
                gender: gender,
                date_of_birth: date_of_birth,
                phone_number: phone_number,
                address: address,
                bonus_mark: 0
            })
            .then(() => {
                res.status(200).json('Tạo tài khoản thành công ');
            })
            .catch(() => {
                res.status(500).json('Lỗi server')
            })
        }
    }
};
module.exports = new CreateCustommerControllers;