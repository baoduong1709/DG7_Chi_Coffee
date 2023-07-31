const Employee = require('../../../models/Employee')
class ViewEmployeeDetailsControllers {
    
    async view(req, res, next) {
        try{
            let _id =req.params._id
            const employee= await Employee.findById(_id)
            if (!employee) {
                return res.status(404).send('Nhân viên không tồn tại')
            }
            await Employee.findById(_id,'name ssn phone_number gmail gender date_of_birth shift_number address position username')
            .then(data => {
    
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
        }
        catch (err) {
            return res.status(401).send('Id không hợp lệ')
        }

    };
}
module.exports = new ViewEmployeeDetailsControllers;