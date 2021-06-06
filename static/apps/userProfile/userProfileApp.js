const userProfileApp = angular.module('UserProfileApp', ['ngMaterial','ngCookies','userProfileModule']);


userProfileApp.controller('userProfileController', ['$scope', '$http','$cookies','userProfileHttpMethods', function ($scope, $http,$cookies,userProfileHttpMethods) {
	const uid = $cookies.get('userClickedId');
	$scope.projects = [1,2,3];
	userProfileHttpMethods.requestUserProjects("m123123").then(res => {
		console.log(res.data);
		$scope.projects = res.data[1];
	})
}]);

userProfileApp.directive('navbar', [function () {
	return {
		restrict: 'E',
		scope: {}, //add user info to scope so the navbar can load username and profile pic
		controller: function ($scope) {

		},
		templateUrl: 'views/navbar.html'


	}
}]);