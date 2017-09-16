// Dependencies
const csv = require('csv');
const fs  = require('fs');
const path = require('path');


// Usage:
// filepath: String containing the path of the target csv
// sum: Number representing the balance of the giftcard
// callback: Function executing after finding a pair, taking 2 arguments
//   err: If any errors are found
//   results: 2D array containing the matching pair
var giftFinder = function findGifts(filepath, sum, callback) {
  // Parse the csv using fs to stream the csv and pipe it to csv.parse()
  fs.createReadStream(path.join(__dirname, filepath))
    .pipe(csv.parse({ delimiter: ',' }, (err, data)=>{
      // data is the 2D array respresentation of csv
      // Hashtable to hold items
      var table = {};
      // Populate the Hashtable
      for (var i = 0; i < data.length; i++) {
        let row = data[i];
        let key = parseInt(row[1]);
        if (key > sum) {
          continue;
        }
        let value = row[0];
        // If the key doesn't exist, create it and set it to empty array
        if (!(key in table)) {
          table[key] = [];
        }
        // Push value into array to allow for collisions
        table[key].push(value);
      }
      // Find items
      var keys = Object.keys(table);
      keys.forEach((currentValue, index, array)=>{
        array[index] = parseInt(currentValue);
      });
      console.log(keys);
      var solutionFound = false;
      var ptrleft = 0;
      var ptrright = keys.length-1;
      for (var i = 0; i < keys.length; i++) {
        let key = keys[i];
        let remaining = sum - keys[ptrleft];

        if (keys[ptrright] > remaining) {
          ptrright = ptrright - 1;
          console.log('ptrright: ' + ptrright);
          continue;
        }
        let curdiff = sum - (keys[ptrleft] + keys[ptrright]);
        let nextdiff = sum - (keys[ptrleft+1] + keys[ptrright]);
        console.log('curdiff: ' + curdiff);
        console.log('nextdiff: ' + nextdiff);
        if (nextdiff < curdiff && nextdiff > 0) {
          ptrleft = ptrleft + 1;
          console.log('ptrleft: ' + ptrleft);
          continue;
        } else {
          console.log(keys[ptrleft]);
          console.log(keys[ptrright]);
          solutionFound = true;
          break;
        }
      }
      if (!solutionFound) {
        callback(new Error("Not possible"));
        return;
      }
      var results = [];
      let item1 = table[keys[ptrleft]];
      let item2 = table[keys[ptrright]];
      let result1 = Array.of(item1[0], keys[ptrleft]);
      let result2 = Array.of(item2[0], keys[ptrright]);
      if (ptrleft === ptrright) {
        if (!(table[keys[ptrleft]].length >= 2)) {
          callback(new Error("Not possible"));
          return;
        } else {
          result2 = Array.of(item2[1], keys[ptrright]);
        }
      }
      results.push(result1);
      results.push(result2);
      callback(null,results);
    })
  );
};

if (require.main === module) {
  // Check Command line Arguments
  if (process.argv.length !== 4) {
    console.log("Error: Incorrect amount of arguments");
    console.log("node app.js [file path] [giftcard balance]");
    process.exit(1);
  }
  // When used from Command Line
  giftFinder(process.argv[2], parseInt(process.argv[3]), (err, results)=>{
    if (err) {
      console.log(err);
      return;
    }
    console.log("%s %d, %s %d", results[0][0], results[0][1], results[1][0], results[1][1]);
  });
}

module.exports = {
  find: giftFinder
};
