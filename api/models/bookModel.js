'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the book title'
  },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Authors' }],
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Books', BookSchema)
