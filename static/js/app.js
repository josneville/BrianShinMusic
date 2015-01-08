require('angular');

var app = angular.module('bsm', []);
var controller = require('./controllers');
var service = require('./services');

app.factory('api', service);
app.controller('main', controller);
