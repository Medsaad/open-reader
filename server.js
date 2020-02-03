const express = require('express')

const app = express()

const port = process.env.PORT || 3000

const mongoose = require('mongoose')

// eslint-disable-next-line no-unused-vars
const Book = require('./api/models/bookModel')
const Author = require('./api/models/authorModel')
const User = require('./api/models/userModel')
// created model loading here

const bodyParser = require('body-parser')

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://root:root@mongo:27017/TodoDB?authSource=admin&w=1', { auth: { authdb: 'admin' }, useNewUrlParser: true })
    .catch((err) => {
        console.log("Unable to connect", err);
    });


    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        res.send("API Home");
    });

    const bookRoutes = require('./api/routes/bookRoutes') // importing route
    const authorRoutes = require('./api/routes/authorRoutes') // importing route
    const userRoutes = require('./api/routes/userRoutes') // importing route
    bookRoutes(app) // register the route
    authorRoutes(app) // register the route
    userRoutes(app)

    app.listen(port, () => {
        console.log('Node.js + MongoDB RESTful API server started on: ' + port)
    });

