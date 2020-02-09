const bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
const User = require('../models/userModel');





describe("User Model", () => {
    beforeAll(async () => {
        mongoose.Promise = global.Promise
        await mongoose.connect('mongodb://root:root@mongo:27017/TodoDBTest?authSource=admin&w=1', { auth: { authdb: 'admin' }, useNewUrlParser: true })
            .catch((err) => {
                console.log("Unable to connect", err);
            });    
    });

    test('user should be saved', async () => {
        expect.assertions(1);
        let userData = {};
        userData.email = 'ahmed'+Math.random()+'@test.com';
        let hash = await bcrypt.hash('validpassword', 10)
        userData.password = hash;
        let user = new User(userData);
        try{
            let usr = await user.save();
            expect(usr).toBeTruthy();
        }catch(err){
            expect(err).toBeFalsy();
        }
    });

    test('email and password should be required', async () => {
        expect.assertions(1);
        let userData = {};
        let user = new User(userData);
        try{
            let usr = await user.save();
            expect(usr).toBeFalsy();
        }catch(err){
            expect(err.errors).toBeTruthy();
        }
    });

    test('email and password should be valid', async () => {
        expect.assertions(3);
        let userData = {};
        userData.email = 'invalidemail';
        userData.password = 'nothashedpassword';
        let user = new User(userData);
        try{
            let usr = await user.save();
            expect(usr).toBeFalsy();
        }catch(err){
            expect(err.errors).toBeTruthy();
            expect(err.errors.password).toBeTruthy();
            expect(err.errors.email).toBeTruthy();
        }
    });

    test('email should be unique', async () => {
        expect.assertions(2);
        let userData = {};
        userData.email = 'ahmed@test.com';
        let hash = await bcrypt.hash('validpassword', 10);;
        userData.password = hash;
        let user = new User(userData);
        try{
            let usr = await user.save();
            expect(usr).toBeFalsy();
        }catch(err){
            expect(err.name).toEqual('MongoError');
            expect(err.code).toEqual(11000);
        }
    });

    test('password should be hashed', async () => {
        expect.assertions(3);
        let userData = {};
        userData.email = 'ahmed@test.com';
        userData.email = 'invalidpassword';
        let user = new User(userData);

        try{
            let usr = await user.save();
            expect(usr).toBeFalsy();
        }catch(err){
            expect(err.errors).toBeTruthy();
            expect(err.errors.email).toBeTruthy(); 
            expect(err.errors.email.kind).toEqual('regexp');
        }
    });

    afterAll(async () => {
        User.remove({}); 
        mongoose.connection.close()  
    });
});
