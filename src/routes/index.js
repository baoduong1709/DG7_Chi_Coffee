
const loginRouter = require('./employees/login')
const createEmployeeRouter = require('./employees/createEmployee')
const updateEmployeeRouter = require('./employees/updateEmpployee')
const deleteEmployeeRouter = require('./employees/deleteEmployee')
const viewEmployeeListRouter = require('./employees/viewEmployeeList')
const viewEmployeeRouter = require('./employees/viewEmployee')

const addProductRouter = require('./products/add')
const editProductRouter = require('./products/edit')
const deleteProductRouter = require('./products/delete')




function route(app) {
    app.use('/api/v1/employee',(res,req, next) => {
        try {
            let token = req.cookies.token
            let check = jwt.verify(token,bao1709)
            if(check) {
                next()
            }
        }catch(err) {
            return res.redirect('/api/v1/auth/employee')
        }
    }, ()=>{
        app.use('/api/v1/auth/employee', loginRouter)
        app.use('/api/v1/employee/create', createEmployeeRouter)
        app.use('/api/v1/employee/update', updateEmployeeRouter)
        app.use('/api/v1/employee/delete', deleteEmployeeRouter)
        app.use('/api/v1/employee/list', viewEmployeeListRouter)
        app.use('/api/v1/employee', viewEmployeeRouter)
    
    
        app.use('/product/add', addProductRouter)
        app.use('/product/edit', editProductRouter)
        app.use('/product/delete', deleteProductRouter)
    })
}
module.exports = route;
