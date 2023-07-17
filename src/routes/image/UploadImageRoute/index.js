var express = require('express');
var router = express.Router()

const UploadImageControllers = require('../../../app/controllers/image/Upload_Image_controllers')
router.post('/', UploadImageControllers.upload)
module.exports = router;