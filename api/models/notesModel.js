'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
  note: {
    type: String,
    required: 'Kindly enter the note',
    minlength: 3
  },
  read: { type: Schema.Types.ObjectId, ref: 'Reads', required: true },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Notes', noteSchema)
