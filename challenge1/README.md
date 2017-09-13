# Challenge 1

__https://carlin-paxos-challenge1.herokuapp.com/__

### How to run this locally
* Ensure you have Node.js v8.1.4 or above and NPM v5.4.1 or above
* Run `npm install` in this directory to install all dependencies
* To run the server, you can do this 2 ways:
  * If you are okay with using port 8080, run `node app.js`
  * If you want to specify a port, run `PORT=<PORTNUMBER> node app.js`, replacing `<PORTNUMBER>` with what you want
* Then you should be all set to send GET and POST requests to localhost:8080
  * ex:
  * `curl -X POST -H "Content-Type: application/json" -d '{"message": "foo"}' localhost:8080/messages`
  * `curl -i localhost:8080/messages/2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae`
  
### Bonus Question
A major bottleneck for this service would be that it stores the hash values inside a javascript object in memory. For a large amount of users, this object would grow very large, but accessing the values would be very quick. A solution would be to store the hash values in a database. In terms of scaling the service, I might consider caching the results on a caching server with Redis.
