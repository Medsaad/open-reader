'use strict'

module.exports = function (app) {
  const book = require('../controllers/authorController')

  // todoList Routes
  app.route('/authors')
    .get(book.index)
    .post(book.new)

  app.route('/authors/:authorId')
    .get(book.show)
    .put(book.update)
    .delete(book.delete)
}
