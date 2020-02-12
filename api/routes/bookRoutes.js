'use strict'
const router = require('express').Router();

const book = require('../controllers/bookController')

  // todoList Routes
router.get('/', book.index);
router.post('/', book.new);

router.post('/find', book.search);

router.get('/books/:bookId', book.show);
router.put('/books/:bookId', book.update);
router.delete('/books/:bookId', book.delete);
 

module.exports = router;