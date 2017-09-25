// Dependencies
var heapdump = require('heapdump');
const { Readable } = require('stream');

var fs = require('fs');

// Usage:
// https://nodejs.org/api/stream.html#stream_implementing_a_readable_stream
// options:
//   highWaterMark: <number> The maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource. Defaults to 16384 (16kb), or 16 for objectMode streams
//   encoding: <string> If specified, then buffers will be decoded to strings using the specified encoding. Defaults to null
//   objectMode: <boolean> Whether this stream should behave as a stream of objects. Meaning that stream.read(n) returns a single value instead of a Buffer of size n. Defaults to false
//   read: <function> Implementation for the stream._read() method.
//   destroy: <function> Implementation for the stream._destroy() method.
class XReplacer extends Readable {
  constructor(options) {
    super(options);
  }

  // Set _input for the ReadableStream
  // input: String of 1's, 0's, and X's
  load(input) {
    this._input = Array.from(input);
  }

  _read() {
    if (this._input === undefined) {
      process.nextTick(()=>{
        this.emit('error', 'Please call load(String input) before reading.');
      })
      return;
    }
    var blankSpots = [];
    var counter = [];
    var state = [];

    // Find x indices and add them to blankSpots
    for (var i = 0; i < this._input.length; i++) {
      if (this._input[i] === 'X' || this._input[i] === 'x') {
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
      let temp = this._input;
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
      // Send the string across the stream
      this.push(temp.join(""));
      currentTotal++;
    }
    // End the stream
    this.push(null);
  }
}

// When run from the command line
if (require.main === module) {
  var stats = [];
  // check command line arguments
  if (process.argv.length != 3) {
    console.log("Error: Incorrect amount of arguments");
    console.log("node app.js [string of 1's, 0's, and X's]");
    process.exit(1);
  }
  // Grab input from command line
  var inputString = process.argv[2];
  var xr = new XReplacer({encoding: 'utf8'});
  xr.load(inputString);
  xr.on('data', (data)=>{
    heapdump.writeSnapshot();
    process.stdout.write(data);
  });
  xr.on('end', ()=>{
    process.exit(0);
  });
}


module.exports = XReplacer;
