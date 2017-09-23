// x x x x
// 0 0 0 0
// 0 0 0 1
// 0 0 1 0
// 0 0 1 1
// 0 1 0 0
// 0 1 0 1
// 0 1 1 0
// 0 1 1 1
// 1 0 0 0
// 1 0 0 1
// 1 0 1 0
// 1 0 1 1
// 1 1 0 0
// 1 1 0 1
// 1 1 1 0
// 1 1 1 1
//
// 3 2 1 0

// Grab input from command line
var input = Array.from(process.argv[2]);

var blankSpots = [];

for (var i = 0; i < input.length; i++) {
  if (input[i] === 'X' || input[i] === 'x') {
    blankSpots.push(i);
  }
}
console.log(blankSpots);
blankSpots.reverse();
console.log(blankSpots);
var counter = [];
// Populate Counter Array to track how many times to switch
for (var i = 0; i < blankSpots.length; i++) {
  counter.push(Math.pow(2, i));
}

console.log(counter);

// Populate array to track states
var state = [];
for (var i = 0; i < blankSpots.length; i++) {
  state.push(false);
}

var totalLength = Math.pow(2,blankSpots.length);
console.log(totalLength);

var results = [];
while (results.length < totalLength) {
  let temp = input;
  for (var i = 0; i < blankSpots.length; i++) {
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

console.log(results);
