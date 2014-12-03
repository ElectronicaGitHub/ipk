app.controller('filmsCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
	console.log($scope)

	$scope.selectedFilmType = 'all';
	$scope.page = 1;
	$scope.limit = 10;
	$scope.films = [];
	$scope.loadButtonLabel = 'Загрузить больше фильмов';
	$scope.stopLoadNews = false;

	var width = $(window).width();
	if (width > 753 && width < 977) {
		$scope.cutNumber = 250;
	}
	if (width > 977 && width < 1185) {
		$scope.cutNumber = 350;
	}
	if (width > 1185) {
		$scope.cutNumber = 450;
	}

	$(window).resize(function() {
		a = $(this).width();
		console.log(a)
		if (a > 753 && a < 977) {
			$scope.cutNumber = 250;
		}
		if (a > 977 && a < 1185) {
			$scope.cutNumber = 350;
		}
		if (a > 1185) {
			$scope.cutNumber = 450;
		}
		console.log($scope.cutNumber);
		$scope.$apply();
	})


	$scope.selectOptions = {
		'documental' : 'Документальный',
		'animation' : 'Анимационный',
		'artistic' : 'Художественный',
		'series' : 'Телесериал',
		'advertise' : 'Рекламный ролик',
		'science' : 'Научно-популярный' 
	}

	$scope.filmTypes = {
		'documental' : 'Документальные',
		'animation' : 'Анимационные',
		'artistic' : 'Художественные',
		'series' : 'Телесериалы',
		'advertise' : 'Рекламные ролики',
		'science' : 'Научно-популярные' 
	}
	$scope.init = function() {
		$scope.getFilms();
	}
	$scope.frameSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

	$scope.getFilms = function() {
		url = '/films/' + $scope.selectedFilmType + '?page=' + $scope.page;
		$scope.loadButtonLabel = 'Загружаем ...'
		$http.get(url)
			.success(function (data) {
				if (data.length < $scope.limit) {
					$scope.stopLoadNews = true;
				} else {
					$scope.loadButtonLabel = 'Загрузить больше фильмов'
				}
				$scope.films = $scope.films.concat(data);
				$scope.page++;
				console.log('$scope.films = ', $scope.films);
			})
			.error(function (data) {
				console.log(data)
			})
	}

	$scope.loadMoreNews = function() {
		$scope.getFilms();
	}

	$scope.setSelectedFilm = function(type) {
		$scope.selectedFilmType = type;
		$scope.page = 1;
		$scope.films = [];
		$scope.getFilms();
	}
}])