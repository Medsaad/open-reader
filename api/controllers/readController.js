'use strict'

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Read = mongoose.model('Reads');

exports.start = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { book } = req.body;

    try{
        //check if the user has read this book before.
        const readExists = await Read.findOne({book: book, user: req.user_id});

        if(readExists){
            return res.status(400).json({ error: "This book has already been read before!" });
        }
    
        const read = new Read({
            book,
            user: req.user_id,
            currentPage: 0
        });
        
        read.save((err, read) => {
            if(err) { return res.status(400).json(err); }
            return res.json({message: "A new reading has started"});
        });
    }catch(err){
        console.log(err);
    }
}

exports.finish = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { book } = req.body;

    //check if the user has read this book before.
    try{
        const read = await Read.findOne({book: book, user: req.user_id});
        read.finished = true;
    
        read.save((err, read) => {
            if(err) { return res.status(400).json(err); }
            return res.json({message: "You have successfully finished reading this book"});
        });
    }catch(err){
        console.log(err);
    }
}

exports.list = async (req, res) => {
    const { status } = req.query;

    let filters = {user: req.user_id};

    if(status){
        filters.finished = (status === 'current')? false : true;
    }

    try{
        const reads = await Read.find(filters);
        return res.json(reads);
    }catch(err){
        console.log(err);
    }

}

exports.progress = async (req, res) => {
    const { book, currentPage } = req.body;

    let filters = {book: book, user: req.user_id};

    try{
        const read = await Read.findOneAndUpdate(filters, {currentPage});
        return res.json({message: "updated successfully"});
    }catch(err){
        console.log(err);
    }

}
