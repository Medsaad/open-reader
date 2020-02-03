'use strict'

const mongoose = require('mongoose')

const Book = mongoose.model('Books')

exports.index = (req, res) => {
    Book.find({}, function (err, book) {
        if (err) { res.send(err) }
        res.json(book)
    })
}

exports.new = (req, res) => {
    const newBook = new Book(req.body)
    newBook.save(function (err, book) {
        if (err) { res.send(err) }
        res.json(book)
    })
}

exports.show = (req, res) => {
    Book.findById(req.params.bookId, function (err, book) {
        if (err) { res.send(err) }
        res.json(book)
    })
}

exports.search = (req, res) => {
    Book.find({
        title: {$regex: req.query.s, $options: 'i'}
      }, function (err, books) {
        if (err) { res.send(err) }
        res.json(books)
    })
}

exports.update = (req, res) => {
    Book.findOneAndUpdate({ _id: req.params.bookId }, req.body, { new: true }, function (err, book) {
        if (err) { res.send(err) }
        res.json(book)
    })
}

exports.delete = (req, res) => {
    Book.remove({
        _id: req.params.bookId
    }, function (err, book) {
        if (err) { res.send(err) }
        res.json({ message: 'Book successfully deleted' })
    })
}
