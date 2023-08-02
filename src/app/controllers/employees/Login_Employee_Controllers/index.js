const Employee = require('../../../models/Employee')
const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");
class LoginEmployeeControllers {

    login(req, res, next) {
        let username = req.body.username
        let passwordC = req.body.password
        Employee.findOne({
            username: username           
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
                        let isAdmin = data.isAdmin
                        return res.status(200).json({
                            message: 'Login successfully!',
                            token: token,
                            name: name,
                            isAdmin: isAdmin
                        })
                    }else{
                        res.status(404).send('Sai mật khẩu!')
                    }                   
                } else {  
                    res.status(404).send('Tài khoản không tồn tại!')
                }
            })
            .catch(error => {
                res.status(500).send('Lỗi server!')
        })
        
    }
    
};
module.exports = new LoginEmployeeControllers;