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

// Hashtable to hold items
var table = {};
// Parse the CSV
fs.createReadStream(path.join(__dirname, process.argv[2]))
  .pipe(csv.parse({ delimiter: ',' }, (err, data)=>{
    console.log(data);
  });
);

// Populate initial table with values
/*
parser.from.path(process.argv[2]).to.array((row)=>{
  var key = row[1];
  var value = row[0];
  // If the key doesn't exist, create it and set it to empty array
  if (!(key in table)) {
    table[key] = [];
  }
  // Push value into array to allow for collisions
  table[key].push(value);
});

console.log(table);
*/
