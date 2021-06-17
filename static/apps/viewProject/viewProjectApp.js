const viewProjectApp = angular.module('ViewProjectApp', ['ngMaterial', 'ngCookies']);

viewProjectApp.controller('viewProjectController',['$scope', '$cookies','$rootScope', function ($scope, $cookies,$rootScope) {
	$scope.on('currentProjectViewed',(e,project) => {
		console.log(project);
	})
	$scope.currentProjectViewed = $rootScope.currentProjectViewed;
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