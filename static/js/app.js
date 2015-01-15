$ = require('jquery');
require('angular');

var app = angular.module('bsm', []);
var controller = require('./controllers');
var service = require('./services');
var directives = require('./directives');

app.factory('api', service);
app.controller('main', controller);
app.directive('tile', directives.tile);
app.directive('resize', directives.resize);
