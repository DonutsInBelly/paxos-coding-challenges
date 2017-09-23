var x = require('./app.js');
var xr = new x({encoding: 'utf8'});
xr.load('XXXXX');
xr.on('data', (data)=>{
  console.log(data);
});
xr.on('end', ()=>{
  process.exit(0);
});
