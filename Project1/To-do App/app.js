var express = require('express');
var todoController = require('./controller/todoController');

var app = express();

//set up template engine
app.set('view engine','ejs');

//static files
app.use('/assets', express.static('./public'));

//fire controller
todoController(app);

//listen to port
app.listen(3000);
console.log('You are listen to port 3000');