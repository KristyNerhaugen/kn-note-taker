const express = require('express');
// instantiate the server
const app = express();

// route for front end to request data from
const { notes } = require('./data/notes');
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// method to make server listen 
app.listen(3001, () => {
    console.log(`API server now on port 3001.`);
});

