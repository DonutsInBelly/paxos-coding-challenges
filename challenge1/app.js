// Dependencies
const helmet  = require('helmet');
const express = require('express');

// Set up and configure the application
require('dotenv').config();
var app = express();
var port = process.env.PORT || 8080; // Environment variable from heroku, if none, use 8080
app.use(helmet()); // Use helmet for protection

// Set up Routes

// Launch Application
app.listen(port);
