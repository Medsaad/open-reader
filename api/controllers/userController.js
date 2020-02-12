'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

const User = mongoose.model('Users')

exports.list = async (req, res) => {
    User.find({}, (err, users) => {
        if (err) { res.send(err) }
        res.json(users)
    });
}

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let userObj = {
        email: req.body.email,
        password: hashedPassword,
    }
    if (req.body.name && req.body.name !== '') {
        userObj.name = req.body.name;
    }
    const user = new User(userObj);
    user.save((err, user) => {
        if (err) { res.send(err) }
        res.json(user);
    });
}

exports.login = (req, res) => {
    let user = User.findOne({ email: req.body.email }, async (err, user) => {
        if (!user) {
            res.json({ error: 'User does not exists' })
        }

        const hashedPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (hashedPassword === false) {
            return res.json({ error: "Invalid Password" });
        }

        // let's create a token using the sign() method
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            {
                expiresIn: 60 * 60 // expire in one hour
            }
        );
        // send back an object with the key of token and the value of the token variable defined above
        return res.json({ token });
    });

}
