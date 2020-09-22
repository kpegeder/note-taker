// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up the Express App
const app = express();
const PORT = 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// ===============================================

// Basic route that sends the user to the homepage or notes page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Read the notes json file
app.get("/api/notes", function (req, res) {
  let rawNotes = fs.readFileSync(path.join(__dirname, "/db/db.json"));
  let notes = JSON.parse(rawNotes);
  console.log(notes);
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
