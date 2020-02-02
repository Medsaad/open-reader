'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the author name',
  }
})

module.exports = mongoose.model('Authors', AuthorSchema)
