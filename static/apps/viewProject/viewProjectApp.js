const viewProjectApp = angular.module('ViewProjectApp', ['ngMaterial', 'ngCookies']);

viewProjectApp.controller('viewProjectController',['$scope', '$cookies', function ($scope, $cookies) {
  $scope.rewards = [1,2,3,4,5,6,7,8,9,10];


	

}]);

viewProjectApp.directive('navbar', [function () {
	return {
		restrict: 'E',
		scope: {}, //add user info to scope so the navbar can load username and profile pic
		controller: function ($scope) {

		},
		templateUrl: '../views/navbar.html'


	}
}]);