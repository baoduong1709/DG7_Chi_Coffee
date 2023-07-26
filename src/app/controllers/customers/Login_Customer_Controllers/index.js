const Customer = require('../../../models/Customer')
const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");
class LoginCustomerControllers {
    login(req, res, next) {
        let gmail = req.body.gmail
        let passwordC = req.body.password
        Customer.findOne({
            gmail: gmail
        })
            .then(data => {
                if (data) {
                    let bytes  = CryptoJS.AES.decrypt(data.password, 'duonghuybao');
                    let passwordS = bytes.toString(CryptoJS.enc.Utf8);
                    if (passwordS == passwordC) {
                        let token = jwt.sign({
                            _id: data._id,
                        }, 'bao1709')
                        let name = data.name
                        console.log(data)
                        return res.status(200).json({
                            message: 'Login successfully!',
                            token: token,
                            name: name,
                        })
                    }else{
                        res.status(404).send('Sai mật khẩu!')
                    }
                } else {         
                    res.status(404).send('Tài khoản không tồn tại!')
                }
            })
            .catch(error => {
                res.status(500).send('Tài khoản không tồn tại!')
        })
    }
};
module.exports = new LoginCustomerControllers;