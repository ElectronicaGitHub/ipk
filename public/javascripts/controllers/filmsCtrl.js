app.controller('filmsCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
	console.log($scope)

	$scope.init = function() {
		$scope.getFilms();
	}
	$scope.frameSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
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