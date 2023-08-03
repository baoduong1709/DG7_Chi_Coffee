var express = require('express');
var router = express.Router()
const CheckLoginEmployee =require('../../app/security/CheckLoginEmployee')

const View_Chart_Controllers = require('../../app/controllers/dashboard/View_Chart_Controllers')
router.get('/chart',CheckLoginEmployee.check,View_Chart_Controllers.view)

const View_Statistical_Controllers = require('../../app/controllers/dashboard/View_Statistical_Controllers')
router.get('/statistical',CheckLoginEmployee.check,View_Statistical_Controllers.view)

module.exports = router