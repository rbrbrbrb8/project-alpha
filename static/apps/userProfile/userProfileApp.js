const userProfileApp = angular.module('UserProfileApp', ['ngMaterial', 'ngCookies', 'userProfileModule']);

const parseCookieToArr = cookie => {
	const fixedArrString = cookie.substring(cookie.indexOf('[') + 1,cookie.length - 1);
	const parsedArr = fixedArrString.split(',');
	return parsedArr;
}

userProfileApp.controller('userProfileController', ['$scope', '$cookies', 'userProfileHttpMethods', function ($scope, $cookies, userProfileHttpMethods) {
	$scope.supportedProjects = parseCookieToArr($cookies.get("supportedProjects")); //wrong!!!! get from db and then do length
	$scope.projects = [1, 2, 3];
	$scope.totalMoneyRaised = 0;
	$scope.user = {};
	const query = window.location.search;
	console.log(query);
	userProfileHttpMethods.requestUserProjects(query).then(res => {
		console.log(res.data);
		$scope.projects = res.data[1];
		$scope.totalMoneyRaised = $scope.projects.reduce((total,project) => total + project.amountAlreadyRaised,0);
	});
	userProfileHttpMethods.requestUserInfo(query).then(res => {
		console.log(res.data);
		$scope.user = res.data;
	});

	

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