
const viewProductRouter = require('./products/ViewProductRoute')
function route(app) {
        app.use('/api/v1/product/view', viewProductRouter)
}
module.exports = route;