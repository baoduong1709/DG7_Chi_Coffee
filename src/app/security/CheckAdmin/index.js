class CheckAdmin{
    check(req, res, next){
        let isAdmin = req.data_employee.isAdmin
        if (isAdmin === true){
            next()
        }else{
            res.json('Not permissions')     
        }
    }
}
module.exports = new CheckAdmin