'use strict';
const express = require('express');
const cors = require('cors');
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

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("API Home");
});

app.use('/users', require('./api/routes/userRoutes'));
app.use('/books', require('./api/routes/bookRoutes'));
app.use('/authors', require('./api/routes/authorRoutes'));
app.use('/sessions', require('./api/routes/noteRoutes'));
app.use('/reads', require('./api/routes/readRoutes'));
app.listen(port, () => {
    console.log('Node.js + MongoDB RESTful API server started on: ' + port)
});

