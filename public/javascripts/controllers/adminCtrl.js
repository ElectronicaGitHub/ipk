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
	$scope.fields = {};
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
	
	$scope.filmFields = {
		'picture_url': 'input',
		'film_url' : 'input',
		'synopsis' : 'textarea',
		'title' : 'input',
		'year' : 'input',
		'time' : 'input'
	};

	$scope.eventFields = {
		'text': 'textarea',
		'description': 'textarea',
		'title': 'input'
	};

	$scope.save = function(data, type) {
		console.log(data);
		if (type === 'film') {
			url = '/admin/film';
		} else {
			url = '/admin/event';
		}
		$http.post(url, data)
			.success(function (data) {
				console.log('ВСЕ ОК ', data);
				window.location.href = '/';
			})
			.error(function (data) {
				console.log(data);
			})
	}
	$scope.update = function(data, type) {
		console.log(data);
		if (type === 'film') {
			url = '/admin/film/update';
		} else {
			url = '/admin/event/update';
		}
		$http.post(url, data)
			.success(function (data) {
				console.log('ВСЕ ОК АПДЕЙТ ', data);
				window.location.href = '/';
			})
			.error(function (data) {
				console.log(data);
			})
	}
	$scope.goToAll = function() {
		window.location.href = '/admin/list';
	}
}])