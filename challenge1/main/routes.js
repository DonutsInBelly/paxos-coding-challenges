const init = function RouteHandler(app) {
  app.post('/message/:hash');
  app.get('/message');
}

module.exports = init;
