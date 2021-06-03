const userProfileApp = angular.module('UserProfileApp', ['ngMaterial']);


userProfileApp.controller('userProfileController', ['$scope', '$http', function ($scope, $http) {
  $scope.projects = [1,1,1,1,1,1];
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