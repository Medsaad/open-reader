'use strict'

const router = require('express').Router();

const author = require('../controllers/authorController')

  // todoList Routes
router.get('/', author.index);
router.post('/', author.new);

router.get('/authors/:authorId', author.show);
router.put('/authors/:authorId', author.update);
router.delete('/authors/:authorId', author.delete);
 

module.exports = router;