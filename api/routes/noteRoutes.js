'use strict'
const router = require('express').Router();
const { ensureLoggedIn } = require('./auth');

const note = require('../controllers/noteController')

  // todoList Routes
router.get('/', ensureLoggedIn, note.all);
router.post('/', ensureLoggedIn, note.new);

router.post('/find', ensureLoggedIn, note.search);

router.get('/notes/:noteId', ensureLoggedIn, note.show);
router.put('/notes/:noteId', ensureLoggedIn, note.update);
router.delete('/notes/:noteId', ensureLoggedIn, note.delete);


module.exports = router;