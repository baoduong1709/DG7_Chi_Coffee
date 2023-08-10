const Customer = require('../../../models/Customer')
const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");
class LoginCustomerControllers {
    async login(req, res, next) {
        let gmail = req.body.gmail
        let passwordC = req.body.password
        try{
            const customer = await Customer.findOne({
                gmail: gmail
            }).exec()
            if (customer) {
                let bytes  = CryptoJS.AES.decrypt(customer.password, 'duonghuybao');
                let passwordS = bytes.toString(CryptoJS.enc.Utf8);
                if (passwordS == passwordC) {
                    let token = jwt.sign({
                        _id: customer._id,
                    }, 'bao1709')
                    let name = customer.name
                    return res.status(200).json({
                        message: 'Đăng nhập thành công',
                        token: token,
                        name: name,
                    })
                }else{
                    res.status(404).send('Sai mật khẩu!')
                }
            }else{
                res.status(500).send('Gmail không đúng!')
            }
        }
        catch{
            res.status(500).send('Gmail không đúng!')
        }
    }
};
module.exports = new LoginCustomerControllers;