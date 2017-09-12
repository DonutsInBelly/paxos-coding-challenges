// Dependencies
const helmet     = require('helmet');
const bodyparser = require('body-parser');
const express    = require('express');
const routes     = require('./main/routes.js');

// Set up and configure the application
var app = express();
var port = process.env.PORT || 8080; // Environment variable from heroku, if none, use 8080
app.use(helmet()); // Use helmet for protection
app.use(bodyparser.urlencoded({ extended: true })); // Enable x-www-form-urlencoded parsing
app.use(bodyparser.json()); // Enable json parsing

// Set up Routes
routes(app);

// Launch Application
app.listen(port, ()=>{
  console.log("Server is running on localhost:%d", port);
});
