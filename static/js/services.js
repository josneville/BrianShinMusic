var services = function($http) {
	return {
		data: function() {
			return $http({
				url: '/data',
				method: 'GET'
			});	
		}
	}
}

module.exports = services;
