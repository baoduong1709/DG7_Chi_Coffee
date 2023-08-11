var express = require('express');
var router = express.Router()
const CheckLoginCustomer = require('../../app/security/CheckLoginCustomer')
const CheckLoginEmployee =require('../../app/security/CheckLoginEmployee')
const CheckAdmin = require('../../app/security/CheckAdmin')

const LoginCustomerControllers = require('../../app/controllers/customers/Login_Customer_Controllers')
router.post('/auth', LoginCustomerControllers.login)

const CreateCustomerControllers = require('../../app/controllers/customers/Create_Customer_Controllers')
router.post('/create', CreateCustomerControllers.create)

const UpdateCustomerControllers = require('../../app/controllers/customers/Update_Customer_Controllers')
router.patch('/details/update',CheckLoginCustomer.check, UpdateCustomerControllers.update)

const ViewCustomerDetailsControllers = require('../../app/controllers/customers/View_Customer_Details_Controllers')
router.get('/details',CheckLoginCustomer.check, ViewCustomerDetailsControllers.view)

const DeleteCustomerControllers = require('../../app/controllers/customers/Delete_Customer_Controllers')
router.delete('/:_id/delete',CheckLoginEmployee.check,CheckAdmin.check, DeleteCustomerControllers.delete)

const ViewCustomerListControllers = require('../../app/controllers/customers/View_Customer_List_Controllers')
router.get('/',CheckLoginEmployee.check, ViewCustomerListControllers.view)

router.get('/:_id',CheckLoginEmployee.check, ViewCustomerDetailsControllers.view)

module.exports = router;

