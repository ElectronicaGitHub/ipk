app.controller('adminCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.$watch('selectedAction', function() {
		console.log($scope.selectedAction);
		if ($scope.selectedAction==='film') {
			$scope.fields = $scope.filmFields;
		} else $scope.fields = $scope.eventFields;
	});

	$scope.data = {};
	$scope.fields = {};

	$scope.filmFields = {
		'picture_url': 'input',
		'film_url' : 'input',
		'synopsis' : 'textarea',
		'title' : 'input'
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
}])