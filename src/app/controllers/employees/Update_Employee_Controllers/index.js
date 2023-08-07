const Employee = require('../../../models/Employee')
class UpdateEmployeeControllers {
    async update(req, res, next) {
        let _id = req.params._id
        let new_ssn = req.body.ssn
        let new_name = req.body.name
        let new_phone_number = req.body.phone_number
        let new_gmail = req.body.gmail
        let new_gender = req.body.gender
        let new_date_of_birth = req.body.date_of_birth
        let new_shift_number = req.body.shift_number
        let new_address = req.body.address
        let new_position = req.body.position
        let isAdmin = new_position === 'admin'
        await Employee.findById(_id)
        .then(data=>{
            if (data==null) {
                return res.status(404).send('Nhân viên không tồn tại');
            }
            if(new_name==null
                || new_ssn == null
                || new_phone_number==null 
                || new_gender==null 
                || new_address==null 
                || new_gmail==null 
                || new_position==null 
                || new_date_of_birth == null){
                return res.status(400).send('Điền đầy đủ thông tin')
                }
            Employee.findByIdAndUpdate(_id, {
                ssn: new_ssn,
                name: new_name,
                phone_number: new_phone_number,
                gmail: new_gmail,
                gender: new_gender,
                date_of_birth: new_date_of_birth,
                shift_number: new_shift_number,
                address: new_address,
                position: new_position,
                isAdmin: isAdmin
            })
            .then(data => {
                res.status(200).send('Cập nhật thành công')
            })
            .catch(err => {
                res.status(500).send('Lỗi server')
            })
        })
        .catch(() => {
            return res.status(404).send('Nhân viên không tồn tại')
        })
        
    }
};
module.exports = new UpdateEmployeeControllers;