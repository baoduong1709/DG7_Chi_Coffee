const Employee = require('../../models/Employee')
class EditControllers {
    edit(req, res, next) {
        let id = req.body.id
        let new_name = req.body.name
        let new_ssn = req.body.ssn
        let new_phone_number = req.body.phone_number
        let new_gmail = req.body.gmail
        let new_gender = req.body.gender
        let new_date_of_birth = req.body.date_of_birth
        let new_shift_number = req.body.shift_number
        let new_address = req.body.address
        let new_position = req.body.position
        Employee.findByIdAndUpdate(id, {
            name: new_name,
            ssn: new_ssn,
            phone_number: new_phone_number,
            gmail: new_gmail,
            gender: new_gender,
            date_of_birth: new_date_of_birth,
            shift_number: new_shift_number,
            address: new_address,
            position: new_position,
        })
            .then(data => {
                res.json('sua thanh cong')
            })
            .catch(err => {
                res.json('loi')
            })
    }
};
module.exports = new EditControllers;