app.controller('filmsCtrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
	console.log($scope)

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
		console.log(';;')
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
		'science' : 'Научно-популярные' 
	}

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