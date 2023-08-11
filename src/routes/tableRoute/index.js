const express = require('express')
const router = express.Router()
const CheckLoginEmployee =require('../../app/security/CheckLoginEmployee')
const CheckLoginCustomer = require('../../app/security/CheckLoginCustomer')

const ViewTableController = require('../../app/controllers/table/View_Table_Controllers')
router.get('/',CheckLoginEmployee.check, ViewTableController.view)

const UpdateTableController = require('../../app/controllers/table/Update_Table_Controllers')
router.put('/update',CheckLoginEmployee.check, UpdateTableController.update)

module.exports = router