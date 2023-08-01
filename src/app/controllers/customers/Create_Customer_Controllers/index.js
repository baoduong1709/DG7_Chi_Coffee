const Customer = require('../../../models/Customer');
const CryptoJS = require("crypto-js");
class CreateCustommerControllers {
    async create(req, res, next) {
        let {name,address,gender,gmail,date_of_birth,phone_number} = req.body
        let password = CryptoJS.AES.encrypt(req.body.password,'duonghuybao').toString()
        const checkGmail = await Customer.findOne({gmail: gmail})
        if(!name|| !gender || !address|| !gmail || !date_of_birth|| !password){
            return res.status(400).json('Nhập thêm thông tin')
        }else if(checkGmail){
            return res.status(409).json('Gmail đã tồn tại')

        }else{
            Customer.create({name,address,gender,gmail,phone_number,date_of_birth,password,bonus_mark: 0})
            .then(() => {
                res.status(200).json('Tạo tài khoản thành công ');
            })
            .catch(error => {
                console.log(error);
                res.status(500).json('Lỗi server')
            })
        }
    }
};
module.exports = new CreateCustommerControllers;