const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./../Models/userModel')
const Book = require('./../Models/bookModel')
const Email = require('./../utils/email')

const signToken = (id) => {
  return jwt.sign({ id }, 'hellohowareupuguysjkdf', {
    expiresIn: '80s',
  })
}

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    const url = `${req.protocol}://${req.get('host')}/me`
    console.log(url)
    await new Email(newUser, url).sendWelcome()

    const token = signToken(newUser._id)

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    // if check email and password exist
    if (!email || !password) {
      return next('error')
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next('incorrct pasword')
    }
    const token = signToken(user._id)

    res.status(200).json({
      status: 'success',
      token,
    })
  } catch (err) {
    console.log(err)
  }
}

exports.orderBooks = async (req, res, next) => {
  try {
    const username = req.body.userName
    const bookname = req.body.bookName
    const result1 = await User.findOne({ userName: username })
    const result2 = await Book.findOne({ bookName: bookname })

    if (result1.userName === username && result2.bookName === bookname) {
      const user = await User.findOneAndUpdate(
        {
          userName: username,
        },
        {
          $push: {
            OrderDetails: result2,
          },
        },
      )
      res.status(200).json({
        status: 'OrderSuccessfull',
        data: {
          data: user,
        },
      })
    }
  } catch (err) {
    res.status(200).json({
      status: 'Bookname or Username doesnot exist',
    })
  }
}

exports.getUser = async (req, res, next) => {
  try {
    const username = req.body.userName

    const result2 = await User.findOne({ userName: username })

    res.status(200).json({
      status: 'OrderSuccessfull',
      data: {
        data: result2,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.logout = async (req, res, next) => {
  try {
    const username = await req.params.name
    res.status(200).json({
      status: `${username} logout successfully`,
    })
  } catch (err) {
    res.status(400).send(err)
  }
}
