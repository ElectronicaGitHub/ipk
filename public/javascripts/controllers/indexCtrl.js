app.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.init = function() {
		$scope.getLastNew();
		$scope.getFilms();
	}

	$scope.getFilms = function() {
		url = '/films/all';
		$http.get(url)
			.success(function (data) {
				$scope.films = data;
			})
			.error(function (data) {
				console.log(data)
			})
	}

	$scope.getLastNew = function() {
		url = '/events/last';
		$http.get(url)
			.success(function (data) {
				$scope.last_new = data;
			})
			.error(function (data) {
				console.log(data)
			})
	}

}])