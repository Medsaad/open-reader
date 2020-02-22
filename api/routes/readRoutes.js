'use strict'
const router = require('express').Router();
const { ensureLoggedIn } = require('./auth');
const { check } = require('express-validator');

const read = require('../controllers/readController');

router.post('/start', ensureLoggedIn, [check('book', 'No book was specified!').not().isEmpty()], read.start);

router.put('/finish', ensureLoggedIn, [check('book', 'No book was specified!').not().isEmpty()], read.finish);
router.put('/progress', ensureLoggedIn, [check('book', 'No book was specified!').not().isEmpty()], read.progress);

router.get('/list', ensureLoggedIn, read.list);


module.exports = router;