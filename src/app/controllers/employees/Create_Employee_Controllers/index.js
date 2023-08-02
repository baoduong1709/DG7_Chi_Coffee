const Employee = require('../../../models/Employee')
const CryptoJS = require("crypto-js");
class CreateEmployeeControllers {
    async create(req, res, next) {
        let{name, ssn, phone_number, gmail, gender, date_of_birth, address, position, username} = req.body
        let password = CryptoJS.AES.encrypt(req.body.password, 'duonghuybao').toString()
        let isAdmin = req.body.position === 'admin'
        const checkSsn = await Employee.findOne({ssn: ssn})
        const checkUsername = await Employee.findOne({username: username})
        if(!name|| !ssn|| !phone_number|| !gender|| !address|| !gmail|| !position|| !date_of_birth || !username|| !password){
            return res.status(400).send('Nhập thêm thông tin')
        }else if(checkSsn){
            return res.status(409).send('Nhân viên đã tồn tại')
        }else if(checkUsername){
            return res.status(409).send('Tài khoản đã tồn tại')

        }else{
            Employee.create({name, ssn, phone_number, gmail, gender, date_of_birth, address, position, username, password, isAdmin})
                .then(() => {
                    res.status(200).send('Đã thêm nhân viên thành công');
                })
                .catch(() => {
                    res.status(500).send('Lỗi server')
                })
        }
    }
};
module.exports = new CreateEmployeeControllers;