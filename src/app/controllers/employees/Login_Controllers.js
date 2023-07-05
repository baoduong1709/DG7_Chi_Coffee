const Employee = require('../../models/Employee')
const path = require('path');
const jws = require('jsonwebtoken')

class LoginControllers {

    login(req, res) {
        let username = req.body.username
        let password = req.body.password
        // let x = [username, password, isAdmin]
        // res.send(x)
        Employee.findOne({
            username: username,
            password: password,
        })
            .then(data => {
                if (data) {
                    let token = jws.sign({
                        _id: data._id
                    }, 'mk')
                    return res.json({
                        mes: ' thanh cong',
                        token: token
                    })
                } else {
                    console.log(username,password)
                    res.send('tai khoan hoac mat khau khong chinh xac')
                }
            })
            .catch()
    }

    view(req, res) {
        res.sendFile(path.join(__dirname, '../../views/login.html'));
    }
};
module.exports = new LoginControllers;