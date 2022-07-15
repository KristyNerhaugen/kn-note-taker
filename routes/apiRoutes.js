const router = require('express').Router();
const { createNewNote, validateNote, deleteNote } = require('../lib/notes');

// GET /api/notes route for front end to request data and return saved data
const { notes } = require('../data/db.json');
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

// route to delete notes
router.delete('/notes/:id', (req, res) => {
    const params = req.params.id;
    deleteNote(params, notes);
})

module.exports = router;