const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const User = require('../models/userModel');

beforeAll(async () => {
    mongoose.Promise = global.Promise
    await mongoose.connect('mongodb://root:root@mongo:27017/TodoDBTest?authSource=admin&w=1', { auth: { authdb: 'admin' }, useNewUrlParser: true })
        .catch((err) => {
            console.log("Unable to connect", err);
        });    
});



describe("User Model", () => {
    test('user should be saved', () => {
        let userData = {};
        userData.email = 'ahmed@test.com';
        bcrypt.hash('validpassword', 10)
        .then(hash => {
            userData.password = hash;
            let user = new User(userData);
            user.save((err, usr) => {
                expect(usr).toBeFalsy();
            });
        });
    });

    test('email and password should be required', () => {
        let userData = {};
        let user = new User(userData);
        user.save((err, usr) => {
            expect(usr).toBeFalsy();
            expect(err.errors).toBeTruthy();
        });
    });

    test('email and password should be valid', () => {
        let userData = {};
        userData.email = 'invalidemail';
        userData.password = 'nothashedpassword';
        let user = new User(userData);
        user.save((err, usr) => {
            expect(usr).toBeFalsy();
            expect(err.errors).toBeTruthy();
            expect(err.errors.password).toBeTruthy();
            expect(err.errors.email).toBeTruthy();
        });
    });

    test('email should be unique', () => {
        let userData = {};
        userData.email = 'ahmed@test.com';
        bcrypt.hash('validpassword', 10).then((hash) => {
            userData.password = hash;
            let user = new User(userData);
            user.save((err, usr) => {
                expect(usr).toBeFalsy();
                expect(err.name).toEqual('MongoError');
                expect(err.code).toEqual(11000);
            });
        });
    });

    test('password should be hashed', () => {
        let userData = {};
        userData.email = 'ahmed@test.com';
        userData.email = 'invalidpassword';
        let user = new User(userData);
        user.save((err, usr) => {
            expect(usr).toBeFalsy();
            expect(err.errors).toBeTruthy();
            expect(err.errors.email).toBeTruthy(); 
            expect(err.errors.email.kind).toEqual('regexp');
        });
    });
});

afterAll(async () => {
    User.remove({}); 
    mongoose.connection.close()  
});