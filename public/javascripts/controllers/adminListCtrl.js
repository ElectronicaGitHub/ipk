app.controller('adminListCtrl', ['$scope', '$http',  function ($scope, $http) {
	$scope.selectedAction = 'film';
	$scope.init = function() {
		$scope.getEvents();
		$scope.getFilms();
	};
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
	};
	$scope.getEvents = function() {
		url = '/events/all';
		$http.get(url)
			.success(function (data) {
				$scope.events = data;
				console.log('$scope.events = ', $scope.events);
			})
			.error(function (data) {
				console.log(data)
			})
	};
	$scope.update = function(data, type) {
		console.log(type);
		console.log(data);
		window.location.href = "/admin?type=" + type + "&id=" + data._id;
	};
	$scope.delete = function(data, type) {
		console.log(type);
		console.log(data);
		url = '/admin/' + type + '/' + data._id;
		console.log(url);
		$http.delete(url)
			.success(function (data) {
				console.log(data)
				$scope.init();
			})
			.error(function (data) {
				console.log(data)
			})
	}
	$scope.goToAdd = function() {
		window.location.href = '/admin';
	}
}])