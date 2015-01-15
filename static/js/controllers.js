var controller = function($scope, $window, api) {
	api.data()
		.success(function(data, status, headers, config) {
			$scope.data = data;
			console.log(data);
		})
		.error(function(data, status, headers, config) {
			$window.alert("Oh Nyo");
		});
	$scope.boxType = function(index) {
		return (index % 7 == 1) || (index % 7 == 4) || (index % 7 == 5);
	}
	$scope.hidingAlgo = function(index) {
		return (index % 7 == 1) || (index % 7 == 5);
	}
	$('iframe').height($('.big-box > img').height());
}

module.exports = controller;
