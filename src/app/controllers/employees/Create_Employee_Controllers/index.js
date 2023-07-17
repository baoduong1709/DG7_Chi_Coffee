const Employee = require('../../../models/Employee')
const CryptoJS = require("crypto-js");
class CreateEmployeeControllers {
    async create(req, res, next) {
        let name = req.body.name
        let ssn = req.body.ssn
        let phone_number = req.body.phone_number
        let gmail = req.body.gmail
        let gender = req.body.gender
        let date_of_birth = req.body.date_of_birth
        let address = req.body.address
        let position = req.body.position
        let username = req.body.username
        let password = CryptoJS.AES.encrypt(req.body.password, 'duonghuybao').toString()
        let isAdmin = position === 'admin'
        const checkSsn = await Employee.findOne({ssn: ssn})
        const checkUsername = await Employee.findOne({username: username})
        if(name==null
            || ssn==null 
            || phone_number==null 
            || gender==null 
            || address==null
            || gmail==null 
            || position==null 
            || date_of_birth == null
            || username==null
            || password==null){
            return res.status(400).send('Nhập thêm thông tin')
        }else if(checkSsn){
            return res.status(409).send('Nhân viên đã tồn tại')
        }else if(checkUsername){
            return res.status(409).send('Tài khoản đã tồn tại')

        }else{
            Employee.create({
                name: name,
                ssn: ssn,
                phone_number: phone_number,
                gmail: gmail,
                gender: gender,
                date_of_birth: date_of_birth,
                address: address,
                position: position,
                username: username,
                password: password,
                isAdmin: isAdmin
            })
              .then(data => {
                    res.status(200).send('Đã thêm nhân viên thành công');
                })
              .catch(err => {
                    res.status(500).send('Lỗi server')
                })
        }
    }
};
module.exports = new CreateEmployeeControllers;
