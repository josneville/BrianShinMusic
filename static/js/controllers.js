var controller = function($scope, $window, api) {
	api.data()
		.success(function(data, status, headers, config) {
			$scope.data = data;
		})
		.error(function(data, status, headers, config) {
			$window.alert("Oh Nyo");
		});

	$scope.boxType = function(index) {
		return (index % 7 == 1) || (index % 7 == 4) || (index % 7 == 5);
	}
	$scope.hidingAlgo = function(index) {
		//var evenMultiple = (Math.floor(index / 7) % 2) == 0;
		var leftSide = (index % 7 == 1) || (index % 7 == 5);
		return leftSide;
		//return evenMultiple && leftSide;
	}
} 

module.exports = controller;

