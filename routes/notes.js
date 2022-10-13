const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


//Getting all the users 

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }
})

// Adding a new note using post method
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 3 }),

], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // If there are errors return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id

        })
        const savedNote = await note.save()

        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }

})

// updating a current node

router.put('/updatenote/:id', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 3 }),

], async (req, res) => {
    try{
        const {title,description,tag} =  req.body;
    
        // Create a new object
    
        const newNote = {};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};
    
        // Find the note to be updated and update it
    
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")}
    
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }
})

// Deleting an existing note
router.delete('/deletenote/:id', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 3 }),

], async (req, res) => {

    try{
        const {title,description,tag} =  req.body;
    
        // Find the note to be deleteded and delete it
    
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")}
    
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json("Success note has been deleted");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error: Some error occured");
    }

})


module.exports = router;