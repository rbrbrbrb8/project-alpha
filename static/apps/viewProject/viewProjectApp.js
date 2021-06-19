const viewProjectApp = angular.module('ViewProjectApp', ['ngMaterial', 'ngCookies','viewProjectModule']);

viewProjectApp.controller('viewProjectController',['$scope', '$cookies','$mdDialog','viewProjectHttpMethods', function ($scope, $cookies,$mdDialog,viewProjectHttpMethods) {
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
	console.log(window.location.search);
	$scope.clearCurrentViewedProjectProperty();
	$scope.donate = (reward,ev) => {
		$mdDialog.show({
      controller: 'viewProjectController',
      templateUrl: '/views/donateDialog.html',
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application to prevent interaction outside of dialog
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function (answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function () {
      $scope.status = 'You cancelled the dialog.';
    });
	}

	
	

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