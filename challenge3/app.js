// Usage:
// input: String of 1's, 0's, and X's
// callback: Function that gets called after building an array of pairs
//   results: array of strings, where each string is a unique combination of 1's and 0's
var xReplacer = function replaceX(input, callback) {
  var blankSpots = [];
  var counter = [];
  var state = [];
  var results = [];

  // Find x indices and add them to blankSpots
  for (var i = 0; i < input.length; i++) {
    if (input[i] === 'X' || input[i] === 'x') {
      blankSpots.push(i);
    }
  }

  // reverse the array to line up with counter and state arrays
  blankSpots.reverse();
  // Populate Counter Array to track how many times to print a 0 or 1 depending on state
  for (var i = 0; i < blankSpots.length; i++) {
    counter.push(Math.pow(2, i));
  }

  // Populate state array to track states (0 or 1)
  // false = 0, true = 1
  for (var i = 0; i < blankSpots.length; i++) {
    state.push(false);
  }

  // Ending condition, total number of combinations
  var totalLength = Math.pow(2,blankSpots.length);

  // Find all combinations
  while (results.length < totalLength) {
    let temp = input;
    // Adjust the input array
    // for each xSpot, set the character according to the state and update the counter for the xSpot
    for (var i = 0; i < blankSpots.length; i++) {
      // change states when counter decrements to 1 and reset the counter
      if (counter[i] === 1) {
        if (state[i] == false) {
          state[i] = true;
          temp[blankSpots[i]] = 0;
        } else {
          state[i] = false;
          temp[blankSpots[i]] = 1;
        }
        counter[i] = Math.pow(2, i);
      } else {
        // adjust the xSpots according to the state of that index, decrement the counter
        if (state[i] === false) {
          temp[blankSpots[i]] = 0;
        } else {
          temp[blankSpots[i]] = 1;
        }
        counter[i] = counter[i] - 1;
      }
    }
    results.push(temp.join(""));
  }
  callback(results);
}

// When run from the command line
if (require.main === module) {
  // check command line arguments
  if (process.argv.length != 3) {
    console.log("Error: Incorrect amount of arguments");
    console.log("node app.js [string of 1's, 0's, and X's]");
    process.exit(1);
  }
  // Grab input from command line
  var inputString = Array.from(process.argv[2]);
  xReplacer(inputString, (results)=>{
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
    }
  });
}

module.exports = {
  findCombinations: xReplacer
}
