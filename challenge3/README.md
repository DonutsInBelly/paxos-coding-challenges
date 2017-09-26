# Challenge 3

### How to run this locally
* Ensure you have Node.js v8.1.4 or above, NPM v5.4.1 or above, and Java Development Kit v1.8.0_144 or above
#### Using Node.js
* Run `npm install` in this directory
* Run `node app.js <INPUT STRING>`, replacing `<INPUT STRING>` with your own value
#### Using Java
* Run `javac xreplacement.java`
* Run `java xreplacement <INPUT STRING>`, replacing `<INPUT STRING>` with your own value

### Some Test Cases
* `node app.js X0`
* `node app.js 10X10X0`
* `node app.js 10`
* `node app.js xxxx`
* `node app.js XxXx`
* `node app.js XXXXXXXXXXXXXXXXXXXXXXXXX`

### Analysis
Since most of the hard work is done in Java, the runtime analysis is based on the code in `xreplacement.java`. Suppose n is the length of the string and m is the amount of X's in the string. The first loop runs through the entire length of the input string to find the X's in the string with O(n) time. The second loop builds two other arrays holding the counter and state arrays for each of the X indices with a runtime of O(m). The final loop finds all the possible combinations running in O(2<sup>m</sup>m). The total runtime is O(m + n + 2<sup>m</sup>m) which is O(2<sup>m</sup>m).

### Notes
So the reason why `app.js` spawns a child process to run a java program is because Node.js consumes a ton of memory. In the initial version of `app.js`, any amount of X's above 23 would cause `FATAL ERROR: JavaScript heap out of memory` before it could finish. I thought this might be due to pushing each new combination into a large array of strings called results. So I tried a different approach using streams. Ideally, each time a new string was created, it should push it into the stream and then V8's Garbage Collector should free that space. Even when the Garbage Collector is called, the memory was never freed properly. `Memory-consumption.png` depicts the memory usage here. I was unable to solve the memory leaks after spending some time with it so I thought using java would be the best way to handle it. I used Node.js to execute the program because I felt that if I had started the project with Node.js and if it was a project requirement, I should be able deliver a result using it.
