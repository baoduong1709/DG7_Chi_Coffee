const Employee = require('../../models/Employee')
class AddControllers {
    add(req, res, next) {
        let name = req.body.name
        let ssn = req.body.ssn
        let phone_number = req.body.phone_number
        let gmail = req.body.gmail
        let gender = req.body.gender
        let date_of_birth = req.body.date_of_birth
        let shift_number = req.body.shift_number
        let address = req.body.address
        let position = req.body.position
        let username = req.body.username
        let password = req.body.password
        let isAdmin = req.body.isAdmin
        Employee.findOne({
            ssn: ssn
        })
            .then(data => {
                if (data) {
                    res.json('nhan vien da ton tai')
                } else {
                    Employee.findOne({
                        username: username
                    })
                        .then(data => {
                            if (data) {
                                res.json('tai khoan da ton tai')
                            } else {
                                Employee.create({
                                    name: name,
                                    ssn: ssn,
                                    phone_number: phone_number,
                                    gmail: gmail,
                                    gender: gender,
                                    date_of_birth: date_of_birth,
                                    shift_number: shift_number,
                                    address: address,
                                    position: position,
                                    username: username,
                                    password: password,
                                    isAdmin: isAdmin
                                })
                                    .then(data => {

                                        res.json('da tao nhan vien thanh cong')
                                    })
                                    .catch(err => {
                                        res.json('loi server')
                                    })
                            }
                        })
                }
            })
    }
};
module.exports = new AddControllers;