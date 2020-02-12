'use strict';
const express = require('express')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000

const mongoose = require('mongoose')

// eslint-disable-next-line no-unused-vars
const Book = require('./api/models/bookModel')
const Author = require('./api/models/authorModel')
const User = require('./api/models/userModel')
const Read = require('./api/models/readModel')
const Note = require('./api/models/notesModel')
// created model loading here

const bodyParser = require('body-parser')

// mongoose instance connection url connection
try{
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://root:root@mongo:27017/TodoDB?authSource=admin&w=1', { auth: { authdb: 'admin' }, useNewUrlParser: true, useCreateIndex: true })
        .catch((err) => {
            console.log("Unable to connect", err);
        });
}catch(err){
    console.log('Unable to connect to database.')
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("API Home");
});

const bookRoutes = require('./api/routes/bookRoutes') // importing route
const authorRoutes = require('./api/routes/authorRoutes') // importing route
const userRoutes = require('./api/routes/userRoutes') // importing route
const noteRoutes = require('./api/routes/noteRoutes') // importing route
const readRoutes = require('./api/routes/readRoutes') // importing route

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/author', authorRoutes);
app.use('/notes', noteRoutes);
app.use('/reads', readRoutes);
app.listen(port, () => {
    console.log('Node.js + MongoDB RESTful API server started on: ' + port)
});

