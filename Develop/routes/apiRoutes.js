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
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    let rawNotes = fs.readFileSync("db/db.json");
    let note = JSON.parse(rawNotes);
    // notes.push(note);
    return note;
  });

  // app.get("/api/tables", function (req, res) {
  //   res.json(tableData);
  // });

  // app.get("/api/waitlist", function (req, res) {
  //   res.json(waitListData);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  // app.post("/api/tables", function (req, res) {
  //   // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  //   // It will do this by sending out the value "true" have a table
  //   // req.body is available since we're using the body parsing middleware
  //   if (tableData.length < 5) {
  //     tableData.push(req.body);
  //     res.json(true);
  //   } else {
  //     waitListData.push(req.body);
  //     res.json(false);
  //   }
  // });

  // Create note
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let rawNotes = fs.readFileSync("db/db.json");
    let note = JSON.parse(rawNotes);
    console.log(JSON.stringify(newNote));
    console.log(note);
    note.push(newNote);
    console.log(note);
    fs.writeFile("db/db.json", JSON.stringify(note), "utf8", (err) => {
      if (err) return res.json(err);
      console.log("file written successfully");
      // res.json(true);
    });
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
