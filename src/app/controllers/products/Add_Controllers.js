const Employee = require('../../models/Employee')
class AddControllers {
    add(req, res, next) {

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