const express = require('express')
const app = require('../app')
const Admin = require('./../models/adminModel')

const User = require('./../Models/userModel')
const Book = require('./../Models/bookModel')
const { isValidObjectId } = require('mongoose')

exports.signup = async (req, res, next) => {
  try {
    const newAdmin = await Admin.create(req.body)

    res.status(200).json({
      status: 'success',

      data: {
        data: newAdmin,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const adminEmail = await Admin.findOne({ email: email })
    if (adminEmail.password === password) {
      res.status(200).json({
        status: 'Welcome to Admin Page',
      })
    } else {
      res.send('Invalid email or password')
    }
  } catch (err) {
    console.log(err)
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUSer = await User.find()

    res.status(200).json({
      status: 'List of all Users',

      data: {
        data: allUSer,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
exports.getallBooks = async (req, res, next) => {
  try {
    const allBook = await Book.find()

    res.status(200).json({
      status: 'List of all Books',

      data: {
        data: allBook,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getUserDetails = async (req, res, next) => {
  try {
    const username = req.body.userName
    const result = await User.findOne({ userName: username })
    const userName = result.userName

    if (result) {
      res.status(200).json({
        username: result.userName,
        orderDetails: {
          orders: result.OrderDetails,
        },
      })
    } else {
      res.status(200).json({
        status: 'Invalid userName',
      })
    }
  } catch (err) {
    console.log(err)
  }
}

exports.getBookUsers = async (req, res, next) => {
  try {
    const bookname = req.body.bookName
    const result = await User.findOne({
      OrderDetails: { $elemMatch: { bookName: bookname } },
    })
    const user = result.userName
    if (result) {
      res.status(200).json({
        status: `User that has purchase ${bookname} book`,
        data: {
          user: user,
        },
      })
    }
  } catch (err) {
    console.log(err)
  }
}
