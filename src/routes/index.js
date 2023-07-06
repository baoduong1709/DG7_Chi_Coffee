
const loginRouter = require('./employees/login')
const addEmployeeRouter = require('./employees/add')
const editEmployeeRouter = require('./employees/edit')
const deleteEmployeeRouter = require('./employees/delete')

const addProductRouter = require('./products/add')
const editProductRouter = require('./products/edit')
const deleteProductRouter = require('./products/delete')

function route(app) {
    app.use('/login', loginRouter)
    app.use('/employee/add', addEmployeeRouter)
    app.use('/employee/edit', editEmployeeRouter)
    app.use('/employee/delete', deleteEmployeeRouter)

    app.use('/product/add', addProductRouter)
    app.use('/product/edit', editProductRouter)
    app.use('/product/delete', deleteProductRouter)
}
module.exports = route;