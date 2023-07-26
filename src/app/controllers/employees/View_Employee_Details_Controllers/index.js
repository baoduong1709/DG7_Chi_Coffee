const Employee = require('../../../models/Employee')
class ViewEmployeeDetailsControllers {
    
    async view(req, res, next) {
        let id =req.params.id
        const employee= await Employee.findById(id)
        if (!employee) {
            return res.status(404).send('Nhân viên không tồn tại')
        }
        await Employee.findById(id,'name ssn phone_number gmail gender date_of_birth shift_number address position username')
        .then(data => {

            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).send('Lỗi server')
        })

    };
}
module.exports = new ViewEmployeeDetailsControllers;