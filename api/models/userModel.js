'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: 'Please enter your email',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique : true,
    dropDups: true
  },
  password: {
      type: String,
      required: 'Please enter your password',
      minlength: 8,
      match: [/[A-Za-z\d@$!%*#?&]$/, 'Password must contains numbers, letters and special characters']
  },
  name: {
    type: String,
    required: false,
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Users', userSchema)
