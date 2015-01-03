var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'));
