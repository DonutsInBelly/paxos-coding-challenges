// Dependencies
const csv = require('csv');
const fs  = require('fs');
const path = require('path');

// Check Command line Arguments
if (process.argv.length !== 4) {
  console.log("Error: Incorrect amount of arguments");
  console.log("node app.js [file path] [giftcard balance]");
  process.exit(1);
}

/*
TODO:
Make function and export that to allow for modularization
*/

// Parse the csv using fs to stream the csv and pipe it to csv.parse()
fs.createReadStream(path.join(__dirname, process.argv[2]))
  .pipe(csv.parse({ delimiter: ',' }, (err, data)=>{
    // data is the 2D array respresentation of csv
    // Hashtable to hold items
    var table = {};
    // Populate the Hashtable
    for (var i = 0; i < data.length; i++) {
      var row = data[i];
      var key = parseInt(row[1]);
      var value = row[0];
      // If the key doesn't exist, create it and set it to empty array
      if (!(key in table)) {
        table[key] = [];
      }
      // Push value into array to allow for collisions
      table[key].push(value);
    }
  })
);
