
const homepageApp = angular.module('HomepageApp', ['ngMaterial','ngCookies']);

const parseCookieToArr = cookie => {
	const fixedArrString = cookie.substring(cookie.indexOf('[') + 1,cookie.length - 1);
	const parsedArr = fixedArrString.split(',');
	return parsedArr;
}

homepageApp.controller('HomepageController', ['$scope', '$http','$cookies','$rootScope', async function ($scope, $http,$cookies,$rootScope) {
	$rootScope.currentProjectViewed = {};
	$scope.supportedProjects = parseCookieToArr($cookies.get("supportedProjects"));
	$scope.likedProjects = parseCookieToArr($cookies.get("likedProjects"));
	$cookies.remove("supportedProjects");
	$cookies.put("supportedProjects",$scope.supportedProjects);
	$cookies.remove("likedProjects");
	$cookies.put("likedProjects",$scope.likedProjects);
	$scope.projects = [];
	$scope.getProjects = () => {
		$http.get(`/api/project/firstProjects`).then(res=>{
			console.log(res.data);
			$scope.projects= res.data.firstProjects;
		});

	}

	$scope.moveToProfile = userId => {
		console.log(userId);
		window.location.href = `/userProfile?creatorUserID=${userId}`
	}

	$scope.moveToProject = project => {
		console.log(project);
		$rootScope.$broadcast('currentProjectViewed',project);
		window.location.href = `/viewProject`
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
