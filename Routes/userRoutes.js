const express = require('express')

const userController = require('./../Controller/userController')
const auth = require('./../Controller/authController')
const userRouter = express.Router()

userRouter.post('/users/signup', userController.signup)
userRouter.post('/users/login', userController.login)

userRouter.post('/users/orderBooks', auth, userController.orderBooks)
userRouter.post('/users/getUser', userController.getUser)

userRouter.post('/users/logout/:name', userController.logout)

module.exports = userRouter
