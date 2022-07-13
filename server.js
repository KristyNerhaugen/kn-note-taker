const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

// middleware added using express.static 
app.use(express.static('public'));

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

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

// get route for front end to request data 
const { notes } = require('./data/notes');
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// post method 
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    // if any data in req.body is incorrecnt, send 400 error back
    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
    const note = createNewNote(req.body, notes);
    res.json(notes);
    }
});

// route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// route to connect to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// wildcard route to return to main index.html page if user tries to navigate to page that doesn't exist
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// method to make server listen 
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}.`);
});

