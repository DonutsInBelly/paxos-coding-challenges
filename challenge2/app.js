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
        // Chain values
        table[key].push(value);
      }
      // Find items
      var keys = Object.keys(table);
      keys.forEach((currentValue, index, array)=>{
        array[index] = parseInt(currentValue);
      });
      var best1;
      var best2;
      // Iterate through potential pairs
      for (var curr1 = 0; curr1 < keys.length; curr1++) {
        var diff = sum - keys[curr1];

        // Binary Search for best possible match
        var curr2 = -1;
        var nextIndex = Math.floor((keys.length - 1)/2);
        var minIndex = 0;
        var maxIndex = keys.length-1;
        while (nextIndex != curr2) {
          curr2 = nextIndex;
          // Break if we found a valid pair, continue otherwise
          if (diff == keys[curr2]) {
            // Detect duplicate prices and check if there's 2 unique items
            if (keys[curr1] == keys[curr2] && table[keys[curr1]].length >= 2) {
              break;
            } else if (keys[curr1] != keys[curr2]) {
              break;
            }
          }
          if (diff > keys[curr2]) {
            minIndex = curr2;
            nextIndex = Math.floor(((maxIndex-minIndex)/2) + curr2);
            continue;
          }
          if (diff <= keys[curr2]) {
            maxIndex = curr2;
            nextIndex = Math.floor(curr2 - ((maxIndex-minIndex)/2));
            continue;
          }
        }
        // Compare sums
        let bestdiff = sum - (keys[best1] + keys[best2]);
        let currdiff = sum - (keys[curr1] + keys[curr2]);
        // current is better than best values or if best has no values
        if ((currdiff < bestdiff && currdiff >= 0) || (best1 === undefined && best2 === undefined)) {
          best1 = curr1;
          best2 = curr2;
        }
      }
      // If there's no possible combination of gifts, set Not Possible Error
      if ((keys[best1] === undefined && keys[best2] === undefined) || (sum - (keys[best1] + keys[best2]) < 0)) {
        callback("Not possible");
        return;
      }
      // Build 2D Result Array
      var results = [];
      let item1 = table[keys[best1]];
      let item2 = table[keys[best2]];
      let result1 = Array.of(item1[0], keys[best1]);
      let result2 = Array.of(item2[0], keys[best2]);
      // Check for duplicates
      if (best1 === best2) {
        if (!(table[keys[best1]].length >= 2)) {
          callback("Not possible");
          return;
        } else {
          result2 = Array.of(item2[1], keys[best2]);
        }
      }
      results.push(result1);
      results.push(result2);
      callback(null,results);
    })
  );
};

// If run from the command line
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
