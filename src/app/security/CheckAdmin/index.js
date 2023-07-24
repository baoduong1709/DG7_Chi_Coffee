class CheckAdmin{
    check(req, res, next){
        let isAdmin = req.data.isAdmin
        if (isAdmin === 'true'){
            next()
        }else{
            res.json('Not permissions')     
        }
    }
}
module.exports = new CheckAdmin