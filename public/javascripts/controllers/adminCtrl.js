app.controller('adminCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.$watch('selectedAction', function() {
		console.log($scope.selectedAction);
		if ($scope.selectedAction==='film') {
			$scope.fields = $scope.filmFields;
		} else if ($scope.selectedAction === 'event') {
			$scope.fields = $scope.eventFields;
		}
	});

	$scope.data = {};
	$scope.fields = [];
	$scope.update = false;
	$scope.updateFilm = false;
	$scope.updateEvent = false;

	if (window.data) {
		console.log(window.data);
		if (window.data.type === 'film') {
			$scope.selectedAction = 'film';
			$scope.updateFilm = true;
		} else if (window.data.type === 'event'){
			$scope.selectedAction = 'event';
			$scope.updateEvent = true;	
		}
		if (window.data.data) {
			$scope.data = window.data.data;
			console.log($scope.data);
		}
	}
	console.log('$scope.updateEvent = ', $scope.updateEvent)
	console.log('$scope.updateFilm = ', $scope.updateFilm)
	
	$scope.filmFields = [
		['title', 'input', 'Заголовок'],
		['synopsis', 'textarea', 'Синопсис'],
		['genre', 'select', 'Жанр'],	
		['picture_url','input', 'Ссылка на картинку'],
		['film_url', 'input', 'Ссылка на фильм'],
		// ['year', 'input', 'Год выпуска( пример: 2014 , без г.,год., и тд.)'],
		['time', 'input', 'Продолжительность( пример: 38 мин.)']
	];
	$scope.eventFields = [
		['title', 'input', 'Заголовок'],
		['description', 'textarea', 'Описание (неочень большое)'],
		['text', 'textarea', 'Текст']
	];
	$scope.selectOptions = {
		'documental' : 'Документальный',
		'animation' : 'Анимационный',
		'artistic' : 'Художественный',
		'series' : 'Телесериал',
		'advertise' : 'Рекламный ролик',
		'science' : 'Научно-популярные' 
	}

	$scope.save = function(data, type) {
		console.log(data);
		if (type === 'film') {
			url = '/admin_admin/film';
		} else {
			url = '/admin_admin/event';
		}
		$http.post(url, data)
			.success(function (data) {
				console.log('ВСЕ ОК ', data);
				window.location.reload();
			})
			.error(function (data) {
				console.log(data);
			})
	}
	$scope.update = function(data, type) {
		console.log(data);
		if (type === 'film') {
			url = '/admin_admin/film/update';
		} else {
			url = '/admin_admin/event/update';
		}
		$http.post(url, data)
			.success(function (data) {
				console.log('ВСЕ ОК АПДЕЙТ ', data);
				window.location.reload();
			})
			.error(function (data) {
				console.log(data);
			})
	}
	$scope.goToAll = function() {
		window.location.href = '/admin_admin/list';
	}
}])