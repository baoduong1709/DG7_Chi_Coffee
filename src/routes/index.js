
const employeeRouter = require('./employeeRoute')
function route(app) {
    app.use('/api/v1/employee',employeeRouter)
}
module.exports = route;