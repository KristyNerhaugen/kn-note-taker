const router = require('express').Router();
const { createNewNote, validateNote } = require('../lib/notes');

// GET /api/notes route for front end to request data and return saved data
const { notes } = require('../data/db');
router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    // if any data in req.body is incorrecnt, send 400 error back
    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
    }
});

module.exports = router;