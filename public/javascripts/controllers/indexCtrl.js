app.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {

	$scope.init = function() {
		$scope.last_new = {};
		$scope.getLastNew();
		$scope.getFilms();
	}

	$scope.selectOptions = {
		'documental' : 'Документальный',
		'animation' : 'Анимационный',
		'artistic' : 'Художественный',
		'series' : 'Телесериал',
		'advertise' : 'Рекламный ролик',
		'science' : 'Научно-популярные' 
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

	$scope.getLastNew = function() {
		url = '/events/last';
		$http.get(url)
			.success(function (data) {
				$scope.last_new = data;
				console.log('$scope.last_new = ', $scope.last_new);
			})
			.error(function (data) {
				console.log(data)
			})
	}

}])