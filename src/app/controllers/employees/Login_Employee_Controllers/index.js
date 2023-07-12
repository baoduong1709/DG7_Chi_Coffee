const Employee = require('../../../models/Employee')
const path = require('path');
const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");
class LoginControllers {

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
                        res.status(404).json({message: 'Password not correct!'})
                    }
                    
                } else {
                    console.log(username,password)
                    res.status(404).json({message: 'Username not correct!'})
                }
            })
            .catch(error => {res.status(500).json({message: 'Some errors occurred while login!'})
        })
    }
};
module.exports = new LoginControllers;