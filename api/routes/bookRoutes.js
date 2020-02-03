'use strict'

module.exports = function (app) {
  const book = require('../controllers/bookController')

  // todoList Routes
  app.route('/books')
    .get(book.index)
    .post(book.new)

  app.route('/books/find')
    .get(book.search)

  app.route('/books/:bookId')
    .get(book.show)
    .put(book.update)
    .delete(book.delete)
}
