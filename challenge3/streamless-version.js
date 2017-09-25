var input = Array.from(process.argv[2]);
var blankSpots = [];
var counter = [];
var state = [];

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
var currentTotal = 0;

// Find all combinations
while (currentTotal < totalLength) {
  // Adjust the input array
  // for each xSpot, set the character according to the state and update the counter for the xSpot
  for (var i = 0; i < blankSpots.length; i++) {
    // change states when counter decrements to 1 and reset the counter
    if (counter[i] === 1) {
      if (state[i] == false) {
        state[i] = true;
        input[blankSpots[i]] = '0';
      } else {
        state[i] = false;
        input[blankSpots[i]] = '1';
      }
      counter[i] = Math.pow(2, i);
    } else {
      // adjust the xSpots according to the state of that index, decrement the counter
      if (state[i] === false) {
        input[blankSpots[i]] = '0';
      } else {
        input[blankSpots[i]] = '1';
      }
      counter[i] = counter[i] - 1;
    }
  }
  // var heapUsed = process.memoryUsage().heapUsed;
  // console.log("Program is using " + heapUsed + " bytes of Heap.")
  // Send the string across the stream
  console.log(input.join(""));
  currentTotal++;
}
