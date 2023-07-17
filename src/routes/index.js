
const viewProductRouter = require('./products/ViewProductRoute')
const uploadsImageRouter = require('./image/UploadImageRoute')
const uploadCloud = require('../config/cloudinary');
function route(app) {
        app.use('/api/v1/product/view', viewProductRouter)
        app.use('/api/v1/uploads',uploadCloud.single('image'), uploadsImageRouter)
}
module.exports = route;