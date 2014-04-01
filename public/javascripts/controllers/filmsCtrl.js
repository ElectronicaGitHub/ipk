app.controller('filmsCtrl', ['$scope', '$http', function ($scope, $http) {
	console.log($scope)

	$scope.init = function() {
		$scope.getFilms();
	}

	$scope.getFilms = function() {
		url = '/films/all';
		$http.get(url)
			.success(function (data) {
				$scope.films = data;
				console.log('$scope.films = ', $scope.films);
			})
			.error(function (data) {
				console.log(data)
			})
	}
}])