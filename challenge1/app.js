// Dependencies
const helmet  = require('helmet');
const express = require('express');

// Set up and configure the application
var app = express();
var port = process.env.PORT || 8080; // Environment variable from heroku, if none, use 8080
app.use(helmet()); // Use helmet for protection

// Launch Application
app.listen(port);
