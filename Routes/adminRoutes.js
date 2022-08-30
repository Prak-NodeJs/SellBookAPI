const express = require('express')

const adminController = require('./../Controller/adminController')
const router = express.Router()

router.post('/admin/signup', adminController.signup)
router.post('/admin/login', adminController.login)

router.get('/admin/displayallBooks', adminController.getallBooks)

router.get('/admin/displayallUsers', adminController.getAllUsers)
router.get('/admin/getUserDetail', adminController.getUserDetails)

router.get('/admin/BookUsers', adminController.getBookUsers)

module.exports = router
