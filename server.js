const express = require('express');
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();

// route for front end to request data from
const { notes } = require('./data/notes');
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// method to make server listen 
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}.`);
});

