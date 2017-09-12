// Dependencies
const crypto = require('crypto');

// Global Variables
var table = {};

const init = function RouteHandler(app) {
  app.get('/messages/:hash', (req, res)=>{
    // Check if the digest exists in the table, if it does return its value
    if (req.params.hash in table) {
      res.status(200).json({message: table[req.params.hash]});
    } else {
      // Return 404 if digest doesn't exist
      res.status(404).json({err_msg: "Message not found"});
    }
  });
  app.post('/messages', (req, res)=>{
    const hash = crypto.createHash('sha256');
    hash.update(req.body.message);
    var key = hash.digest('hex');
    // Check if the hash we found already exists, if it doesn't add it
    if (!(key in table)) {
      table[key] = req.body.message;
    }
    res.status(200).json({digest: key});
  });
}

module.exports = init;
