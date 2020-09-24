// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// ===============================================

// Basic route that sends the user to the homepage or notes page

require("./Develop/routes/apiRoutes")(app);
require("./Develop/routes/htmlRoutes")(app);

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
