
const employeeRouter = require('./employeeRoute')
const productRouter = require('./productRoute')
function route(app) {
    app.use('/api/v1/employee',employeeRouter)
    app.use('/api/v1/product', productRouter)
}
module.exports = route;