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

var sum = parseInt(process.argv[3]);
console.log(sum);
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
    // Check complement
    // 2 pointers? - how to determine which pointer to move
    //
    var keys = Object.keys(table);
    keys.forEach((currentValue, index, array)=>{
      array[index] = parseInt(currentValue);
    });
    console.log(keys);
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
        break;
      }
      // let match = keys.findIndex((element, index)=>{
      //   console.log(index);
      //   if (element <= remaining) {
      //     if (keys[index] === key) {
      //       if (table[key].length >= 2) {
      //         return element;
      //       }
      //     }
      //     return element;
      //   }
      // });
      // if (match ) {
      //
      // }
      // console.log(match);
      // let result = [];
      // result.push()
      // if (keys[match] === key) {
      //
      // }
    }
  })
);
