const express = require('express')
const app = require('../app')
const Book = require('./../Models/bookModel')

exports.addBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body)

    res.status(200).json({
      status: 'success',

      data: {
        book: newBook,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
