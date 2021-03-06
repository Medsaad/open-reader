'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the book title',
    minlength: 3
  },
  numberOfPages: {
    type: Number
  },
  author:  {
    type: String,
    required: 'Kindly enter the book author',
    minlength: 3
  }, //[{ type: Schema.Types.ObjectId, ref: 'Authors' }],
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Books', BookSchema)
