// Dependencies
const spawn = require('child_process').spawn;

// Usage:
// input: String of 1's, 0's, and X's
var XReplacer = function replaceX(input) {
  // Spawn a process that executes a jar file  that does all the hard work
  // pass input as an argument
  const cp = spawn('java', ['-jar', 'xreplacement.jar', input]);
  // Print anything that the process writes to stdout
  cp.stdout.on('data', (data)=>{
    process.stdout.write(data);
  });
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
  XReplacer(inputString);
}


module.exports = XReplacer;
