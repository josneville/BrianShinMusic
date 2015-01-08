var controller = function($scope, $window, api) {
	api.data()
		.success(function(data, status, headers, config) {
			$scope.data = data;
		})
		.error(function(data, status, headers, config) {
			$window.alert("Oh Nyo");
		});
} 

module.exports = controller;

