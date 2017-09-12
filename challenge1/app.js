// Dependencies
const helmet  = require('helmet');
const express = require('express');
const routes  = require('./main/routes.js');

// Set up and configure the application
var app = express();
var port = process.env.PORT || 8080; // Environment variable from heroku, if none, use 8080
app.use(helmet()); // Use helmet for protection

// Set up Routes
routes(app);

// Launch Application
app.listen(port, ()=>{
  console.log("Server is running on localhost:%d", port);
});
