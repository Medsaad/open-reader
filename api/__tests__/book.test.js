const mongoose = require('mongoose')
const Book = require('../models/bookModel');
const Author = require('../models/authorModel');

describe("Book Model", () => {
    beforeAll(async () => {
        mongoose.Promise = global.Promise
        await mongoose.connect('mongodb://root:root@mongo:27017/TodoDBTest?authSource=admin&w=1', { auth: { authdb: 'admin' }, useNewUrlParser: true })
            .catch((err) => {
                console.log("Unable to connect", err);
            });    
    });

    test('book should be saved', () => {
        expect.assertions(2);
        let authorData = {};
        authorData.name = 'Some Author';
        let author = new Author(authorData);
        try{
            let a = author.save();
            expect(a).toBeTruthy();
            let bookData = {};
            bookData.title = 'Some Book';
            bookData.author = [a._id];
            let book = new Book(bookData);
            try{
                let bk = book.save();
                expect(bk).toBeTruthy();
            }catch(err){}
        }catch(err){}
    });

    afterAll(async () => {
        Book.remove({}); 
        mongoose.connection.close()  
    });

});