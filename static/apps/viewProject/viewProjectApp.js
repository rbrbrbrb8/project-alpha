const viewProjectApp = angular.module('ViewProjectApp', ['ngMaterial', 'ngCookies','viewProjectModule']);

viewProjectApp.controller('viewProjectController',['$scope', '$cookies','$rootScope','viewProjectHttpMethods', function ($scope, $cookies,$rootScope,viewProjectHttpMethods) {
	$scope.clearCurrentViewedProjectProperty = () => {
		window.localStorage.removeItem('currentViewedProject');
	}
	const currentProjStr = window.localStorage.getItem('currentViewedProject');
	const query = window.location.search;
	if(currentProjStr) $scope.currentViewedProject = JSON.parse(window.localStorage.getItem('currentViewedProject'));
	else{
		$scope.currentViewedProject = {};
		viewProjectHttpMethods.requestCurrentViewedProjectInfo(query).then(res => {
			const resData = res.data;
			if(resData) $scope.currentViewedProject = resData;
		});
	}
	$scope.clearCurrentViewedProjectProperty();
	console.log($scope.currentViewedProject);


	
	

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