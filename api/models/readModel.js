'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const readSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Books' },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  currentPage: { type: Number },
  type: { type: String, default: 'book'}, //could be also an article or a research.
  finished: { type: Boolean, default: false },
  created_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Reads', readSchema)
