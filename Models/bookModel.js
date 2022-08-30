const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
})

const Book = new mongoose.model('Book', bookSchema)

module.exports = Book
