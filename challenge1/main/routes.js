const init = function RouteHandler(app) {
  app.get('/message/:hash', (req, res)=>{
    console.log(req.params.hash);
  });
  app.post('/message');
}

module.exports = init;
