'use strict'

const mongoose = require('mongoose')

const Author = mongoose.model('Authors')
const Book = mongoose.model('Books')

exports.index = (req, res) => {
    Author.find({}, async (err, authors) => {
        if (err) { res.send(err) }

        let payload = [];
        for(let key in authors){
            let books = await Book.find({
                authors: { $in: [authors[key]._id]}
            }).count();
            const {_id, name } = authors[key];
            payload.push({_id, name, books})
        }        

        res.json(payload)
    })
}

exports.new = (req, res) => {
    const newAuthor = new Author(req.body)
    newAuthor.save(function (err, author) {
        if (err) { res.send(err) }
        res.json(author)
    })
}

exports.show = (req, res) => {
    Author.findById(req.params.authorId,  async (err, author) => {
        if (err) { res.send(err) }

        let excludedFields = {
            __v: false,
            created_date: false,
            authors: false
        };

        //query author books
        let books = await Book.find({
            authors: { $in: [author._id]}
        }, excludedFields);

        res.json({
            authorId: author._id,
            name: author.name,
            books 
        })
    })
}

exports.update = (req, res) => {
    Author.findOneAndUpdate({ _id: req.params.authorId }, req.body, { new: true }, function (err, author) {
        if (err) { res.send(err) }
        res.json(author)
    })
}

exports.delete = (req, res) => {
    Author.remove({
        _id: req.params.authorId
    }, function (err, author) {
        if (err) { res.send(err) }
        res.json({ message: 'Author successfully deleted' })
    })
}
