var controller = function($scope, $window, api) {
	api.data()
		.success(function(data, status, headers, config) {
			$scope.data = data;
		})
		.error(function(data, status, headers, config) {
			$window.alert("Oh Nyo");
		});
	$scope.smallScreen = (window.innerWidth < 768);
	$scope.boxType = function(index) {
		if ($scope.smallScreen) {
			return 1;
		}
		var leftSide = (index % 7 == 1) || (index % 7 == 4) || (index % 7 == 5);
		return leftSide;
	}
	$scope.hidingAlgo = function(index) {
		if ($scope.smallScreen) {
			return index % 2 == 0;
		}
		return ((index % 7 == 1) || (index % 7 == 5));
	}
	$scope.tileFilter = "";
	$scope.changeFilter = function(filter) {
		$scope.tileFilter = filter;
	}
	$(window).resize(function(){
    $scope.$apply(function(){
       $scope.smallScreen = (window.innerWidth < 768);
    });
	});
}

module.exports = controller;
