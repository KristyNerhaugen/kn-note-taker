
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

// parsing incoming data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware added using express.static 
app.use(express.static('public'));

// middleware 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const { notes } = require('./data/db.json');
const { get } = require('http');

// moving createNewNote and validateNote functions to notes.js
// function createNewNote(body, notesArray){
//     const note = body;
//     notesArray.push(note);
//     fs.writeFileSync(
//         path.join(__dirname, './data/db.json'),
//         JSON.stringify({ notes: notesArray }, null, 2)
//     );

//     return note;
// }

// function validateNote(note) {
//     if (!note.title || typeof note.title !== 'string') {
//       return false;
//     }
//     if (!note.text || typeof note.text !== 'string') {
//       return false;
//     }
//     return true;
//   }

// moving GET to apiRoutes.js 
// GET /api/notes route for front end to request data and return saved data
// const { notes } = require('./data/db');
// app.get('/api/notes', (req, res) => {
//     res.json(notes);
// });

// moving post to api.Routes
// post /api/notes method to recieve new notes, add to db.json file and return new note 
// app.post('/api/notes', (req, res) => {
//     req.body.id = notes.length.toString();
//     // if any data in req.body is incorrecnt, send 400 error back
//     if(!validateNote(req.body)) {
//         res.status(400).send('The note is not properly formatted.');
//     } else {
//     const note = createNewNote(req.body, notes);
//     res.json(notes);
//     }
// });

// moved GET notes route for notes.html to htmlRoutes.js
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });

// moved GET * route to connect to index.html to htmlRoutes.js
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// moved wildcard route to htmlRoutes.js
// wildcard route to return to main index.html page if user tries to navigate to page that doesn't exist
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// })

// method to make server listen 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`);
});

