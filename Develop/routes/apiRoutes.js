// LOAD DATA
const noteList = require("../db/db");
const fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  app.get("/api/notes", function (req, res) {
    res.json(noteList);
  });

  // API POST Requests
  // Create a note
  app.post("/api/notes", function (req, res) {
    const { v4: uuidv4 } = require("uuid");
    let newNote = req.body;
    newNote.id = uuidv4();
    noteList.push(newNote);

    fs.writeFile(
      "./Develop/db/db.json",
      JSON.stringify(noteList),
      "utf8",
      (err) => {
        if (err) throw err;
        res.json(noteList);
      }
    );
  });

  // Deleting a Note
  app.delete("/api/notes/:id", function (req, res) {
    let noteID = req.params.id;

    for (let i = 0; i < noteList.length; i++) {
      if (noteList[i].id === noteID) {
        noteList.splice(i, 1);
        break;
      }
    }
    fs.writeFile(
      "./Develop/db/db.json",
      JSON.stringify(noteList),
      "utf8",
      (err) => {
        if (err) throw err;
        res.send("Deleted Note");
      }
    );
  });
};
