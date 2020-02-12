'use strict'
const { check } = require('express-validator');
const user = require('../controllers/userController')
let router = require('express').Router();

//!temp rout
router.get('/', user.list);


// todoList Routes
router.post('/signup', [check('email', 'Invalid email').isEmail(), check('password').isLength({min: 8})], user.signup);
router.post('/login', [check('email', 'Invalid email').isEmail()], user.login);

module.exports = router;

