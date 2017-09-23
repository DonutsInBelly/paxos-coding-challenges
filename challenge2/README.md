# Challenge 2

### How to run this locally
* Ensure you have Node.js v8.1.4 or above and NPM v5.4.1 or above
* Run `npm install` in this directory to install all dependencies
* Run `node app.js <CSV PATH> <GIFTCARD BALANCE>`, replacing the `<CSV PATH>` and `<GIFTCARD BALANCE>` with your own values
  * Ex:
  * `node app.js tests/default.txt 2500` should return `Earmuffs 2000, Candy Bar 500`
  * Test cases I've used:
  * `node app tests/test1.txt 200000` returns `something 100000, iPhone X 99999`
  * `node app tests/test1.txt 199999` returns `something 100000, iPhone X 99999`
  * `node app tests/test1.txt 199998` returns `iPhone X 99999, MacBook 99999`
  * `node app tests/test1.txt 1500` returns `else 500, Detergent 1000`
  * `node app tests/test1.txt 400` returns `Not possible`
  * `node app tests/test1.txt 401` returns `ayyyyyy 400, penny 1`
  * `node app tests/test2.txt 249` returns `Not possible`
  * `node app tests/test2.txt 250` returns `Not possible`
  * `node app tests/test2.txt 500` returns `a 250, b 250`
  * `node app tests/test2.txt 750` returns `c 500, a 250`
  
### Analysis
Initially, I tried to find an O(n) solution by working with two pointers. I was working with the idea that, since it's sorted, I can move the right pointer down until I found an appropriate solution. The left pointer would move only if the sum of its next possible value and the right pointer would bring us closer to the toal. However, this fails with `test1.txt` and `1500`. My current solution runs in O(nlogn). Populating the hashtable takes O(n) + Finding the pairs takes O(nlogn) = O(n+nlogn), which is really O(nlogn).
