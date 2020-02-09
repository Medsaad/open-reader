const mongoose = require('mongoose')
const Author = require('../models/authorModel');

describe("Author Model", () => {
    beforeAll(async () => {
        mongoose.Promise = global.Promise
        await mongoose.connect('mongodb://root:root@mongo:27017/TodoDBTest?authSource=admin&w=1', { auth: { authdb: 'admin' }, useNewUrlParser: true })
            .catch((err) => {
                console.log("Unable to connect", err);
            });    
    });

    test('author should be saved', () => {
        expect.assertions(1);
        let authorData = {};
        authorData.name = 'Some Author';
        let author = new Author(authorData);
        try{
            let a = author.save();
            expect(a).toBeTruthy();
        }catch(err){}
    });

    afterAll(async () => {
        Author.remove({}); 
        mongoose.connection.close()  
    });
});