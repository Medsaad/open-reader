'use strict'

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Note = mongoose.model('Notes');
const Read  = mongoose.model('Reads');

exports.all = async (req, res) => {
    try{
        const { readId }  = req.params;
        const read = await Read.find({ _id: readId });
        if(!read){
            res.status(400).json({ error: "read does not exist" });
        }

        if(read.user != req.user_id){
            return res.status(400).json({ error: "Not authorized to show notes from this read." });
        }

        const notes = await Note.find({ read: readId });

        return res.status(200).json(notes);
    }catch(error){
        return res.status(500).json({ error });
    }
}

exports.new = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const { readId }  = req.params;
        const read = await Read.find({ _id: readId });
        if(!read){
            return res.status(400).json({ error: "read does not exist" });
        }

        if(read.finished){
            return res.status(400).json({ error: "This read is already finished" });
        }

        if(read.user != req.user_id){
            return res.status(400).json({ error: "Not authorized to add notes to this read." });
        }
    }catch(error){
        return res.status(500).json({ error });
    }
    const noteData = {
        read: req.params.readId,
        user: req.user_id,
        note: req.body.note
    };
    const note = new Note(noteData);
    try{
        await note.save();
        return res.status(200).json({ message: "note created successfully", note });
    }catch(error){
        return res.status(500).json({ error });
    }
}

exports.search = async (req, res) => {
    try{
        const read = await Read.find({ _id: req.params.readId });
        if(!read){
            res.status(400).json({ error: "read does not exist" });
        }

        if(read.user != req.user_id){
            return res.status(400).json({ error: "Not authorized to search notes from this read." });
        }
        const notes = await Note.find({ read: read._id, note: {$regex: req.params.keyword, $options: 'i'} });

        return res.status(200).json(notes);
    }catch(error){
        return res.status(500).json({ error });
    }
}

exports.show = async (req, res) => {
    try{
        const note = await Note.find({ _id: req.params.noteId }).populate('read').exec();

        return res.status(200).json(note);
    }catch(error){
        return res.status(500).json({ error });
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const note = await Note.findOneAndUpdate({ _id: req.params.noteId }, { note: req.body.note },  { new: true });

        return res.status(200).json(note);
    }catch(error){
        return res.status(500).json({ error });
    }
}

exports.delete = async (req, res) => {
    try{
        const note = await Note.remove({ _id: req.params.noteId });

        return res.status(200).json(note);
    }catch(error){
        return res.status(500).json({ error });
    }
}
