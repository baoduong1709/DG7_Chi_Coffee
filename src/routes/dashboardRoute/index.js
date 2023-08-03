var express = require('express');
var router = express.Router()
const CheckLoginEmployee =require('../../app/security/CheckLoginEmployee')

const View_Revenue_Controllers = require('../../app/controllers/dashboard')
router.get('/revenue',CheckLoginEmployee.check,View_Revenue_Controllers.view)

module.exports = router