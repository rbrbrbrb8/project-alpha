
const homepageApp = angular.module('HomepageApp', ['ngMaterial']);


homepageApp.controller('HomepageController', ['$scope', '$http', async function ($scope, $http) {
	$scope.projects = []
	init = async () => {
		$http.get('/api/allprojects').then(res => {
			console.log(res.data);
			$scope.projects = res.data;
		});
	}
	await init();
	$scope.getProject = async project => {
		$http.get(`/api/project/${project._id}`);

	}
}]);

homepageApp.directive('navbar', [function () {
	return {
		restrict: 'E',
		scope: {}, //add user info to scope so the navbar can load username and profile pic
		controller: function ($scope) {

		},
		templateUrl: 'views/navbar.html'


	}
}]);
