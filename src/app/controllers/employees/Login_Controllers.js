const Employee = require('../../models/Employee')
const path = require('path');
const jwt = require('jsonwebtoken')

class LoginControllers {

    login(req, res, next) {
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
                    let token = jwt.sign({
                        _id: data._id
                    }, 'bao1709')
                    return res.status(200).json({
                        message: 'Login successfully!',
                        token: token
                    })
                } else {
                    console.log(username,password)
                    res.status(404).json({message: 'Username or password not correct!'})
                }
            })
            .catch(error => {res.status(500).json({message: 'Some errors occurred while login!'})
        })
    }

    view(req, res) {
        res.sendFile(path.join(__dirname, '../../views/login.html'))
    }
};
module.exports = new LoginControllers;