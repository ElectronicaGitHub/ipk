app.controller('indexCtrl', ['$scope', '$http', function ($scope, $http) {

	
	$scope.init = function() {
		$scope.loadButtonLabel = 'Загрузить больше фильмов';
		$scope.stopLoadNews = false;
		$scope.page = 1;
		$scope.limit = 10;
		$scope.last_new = {};
		$scope.films = [];
		$scope.getLastNew();
		$scope.getFilms($scope.page);
	}

	$scope.selectOptions = {
		'documental' : 'Документальный',
		'animation' : 'Анимационный',
		'artistic' : 'Художественный',
		'series' : 'Телесериал',
		'advertise' : 'Рекламный ролик',
		'science' : 'Научно-популярные' 
	}

	$scope.getFilms = function(page) {
		url = '/films/all?page=' + page;
		$scope.loadButtonLabel = 'Загружаем ...'
		$http.get(url)
			.success(function (data) {
				if (data.length < $scope.limit) {
					$scope.stopLoadNews = true;
				} else {
					$scope.loadButtonLabel = 'Загрузить больше фильмов'
				}
				$scope.films = $scope.films.concat(data);
				$scope.page ++;
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

	$scope.loadMoreNews = function() {
		$scope.getFilms($scope.page);
	}

}])