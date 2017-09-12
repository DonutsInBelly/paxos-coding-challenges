// Dependencies
const crypto = require('crypto');

// Global Variables
var table = {};

const init = function RouteHandler(app) {
  app.get('/message/:hash', (req, res)=>{
    res.status(200).send(table[req.params.hash]);
  });
  app.post('/messages', (req, res)=>{
    const hash = crypto.createHash('sha256');
    hash.update(req.body.message);
    var key = hash.digest('hex');
    table[key] = req.body.message;
    res.status(200).send(key);
  });
}

module.exports = init;
