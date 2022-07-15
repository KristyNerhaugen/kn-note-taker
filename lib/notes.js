const fs = require("fs");
const path = require("path");

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
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

function deleteNote(id, notesArray) {
  // based this function off of code I found for splicing an array here: https://dev.to/pradeepovig/javascript-remove-a-specific-element-from-an-array-3k1b
  const deletedNoteId = id;

  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i].id === deletedNoteId) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
      )
    }
  }
};

module.exports = {
  createNewNote,
  validateNote,
  deleteNote
};