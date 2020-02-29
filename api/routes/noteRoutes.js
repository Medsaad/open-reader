'use strict'
const router = require('express').Router();
const { ensureLoggedIn } = require('./auth');
const { check } = require('express-validator');

const note = require('../controllers/noteController')


router.get('/:readId/notes', ensureLoggedIn, note.all);
router.post('/:readId/notes', ensureLoggedIn, [ check('note', 'No note was specified!').not().isEmpty() ], note.new);

router.get('/:readId/notes/find/:keyword', ensureLoggedIn, note.search);

router.get('/:readId/notes/:noteId', ensureLoggedIn, note.show);
router.put('/:readId/notes/:noteId', ensureLoggedIn, note.update);
router.delete('/:readId/notes/:noteId', ensureLoggedIn, note.delete);


module.exports = router;