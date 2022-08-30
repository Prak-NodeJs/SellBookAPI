const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
  OrderDetails: [{}],
})

userSchema.pre('save', async function (next) {
  if (this.isModified()) {
    this.password = await bcrypt.hash(this.password, 10)
    console.log(`${this.password}`)
    next()
  }
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPasswrod,
) {
  return await bcrypt.compare(candidatePassword, userPasswrod)
}
const User = new mongoose.model('User', userSchema)
module.exports = User
