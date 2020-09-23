// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const noteList = require("../db/db");
const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  app.get("/api/notes", function (req, res) {
    let rawNotes = fs.readFileSync("db/db.json");
    let note = JSON.parse(rawNotes);
    res.json(note);
  });

  // API POST Requests
  // Create a note
  app.post("/api/notes", function (req, res) {
    const { v4: uuidv4 } = require("uuid");
    let newNote = req.body;
    let rawNotes = fs.readFileSync("db/db.json");
    let notes = JSON.parse(rawNotes);

    newNote.id = uuidv4();
    notes.push(newNote);

    fs.writeFile("db/db.json", JSON.stringify(notes), "utf8", (err) => {
      if (err) throw err;
      console.log("File Written Successfully");
      res.json(true);
    });
  });

  // Deleting a Note
  app.delete("/api/notes/:id", function (req, res) {
    let noteID = req.params.id;
    let rawNotes = fs.readFileSync("db/db.json");
    let notes = JSON.parse(rawNotes);

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === noteID) {
        notes.splice(i, 1);
        console.log("Delete this");
      }
    }

    fs.writeFile("db/db.json", JSON.stringify(notes), "utf8", (err) => {
      if (err) throw err;
      res.send("Deleted Note");
    });
  });
};
