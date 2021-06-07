const userProfileApp = angular.module('UserProfileApp', ['ngMaterial','ngCookies','userProfileModule']);


// userProfileApp.config('$locationProvider',function($locationProvider){
// 	$locationProvider.html5Mode(true);
// })


userProfileApp.controller('userProfileController', ['$scope','$cookies','userProfileHttpMethods', function ($scope,$cookies,userProfileHttpMethods) {
	$scope.projects = [1,2,3];
	const query = window.location.search;
	console.log(query);
	userProfileHttpMethods.requestUserProjects(query).then(res => {
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
		templateUrl: '../views/navbar.html'


	}
}]);