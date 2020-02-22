'use strict'
const router = require('express').Router();

const book = require('../controllers/bookController')

  // todoList Routes
router.get('/', book.index);
router.post('/', book.new);

router.post('/find', book.search);

router.get('/:bookId', book.show);
router.put('/:bookId', book.update);
router.delete('/:bookId', book.delete);
 

module.exports = router;