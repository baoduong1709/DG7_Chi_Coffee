
const loginRouter = require('./employees/login')
const addRouter = require('./employees/add')
const editRouter = require('./employees/edit')
const deleteRouter = require('./employees/delete')

function route(app) {
    app.use('/login', loginRouter)
    app.post('/employee/add', addRouter)
    app.put('/employee/edit', editRouter)
    app.delete('/employee/delete', deleteRouter)
}
module.exports = route;