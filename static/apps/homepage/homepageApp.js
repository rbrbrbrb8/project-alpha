
const homepageApp = angular.module('HomepageApp', ['ngMaterial','ngCookies']);


homepageApp.controller('HomepageController', ['$scope', '$http','$cookies', async function ($scope, $http,$cookies) {
	$scope.projects = [];
	$scope.getProjects = () => {
		$http.get(`/api/project/firstProjects`).then(res=>{
			console.log(res.data);
			$scope.projects= res.data.firstProjects;
		});

	}

	$scope.addCookie = uid => {
		console.log("adding cookie...");
		$cookies.put("userClickedId",uid);
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
