const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

// parsing incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}

// get route for front end to request data 
const { notes } = require('./data/notes');
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// post method 
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);

    res.json(notes);
});

// method to make server listen 
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}.`);
});

