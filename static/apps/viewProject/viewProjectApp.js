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

 function DialogController($scope,$mdDialog,projectId,currentReward,httpSender){
	$scope.isModalConfirmed = false;
	$scope.isRequestCompleted = false;
	$scope.afterSec=false;
	$scope.cancelTransaction = () => {
		console.log(projectId);
		console.log(currentReward);
		$mdDialog.cancel();
	};


	$scope.changeAnim = () => {
		$scope.afterSec= true;
		console.log($scope.afterSec);
		$scope.$apply();
	}
	$scope.submitTransaction = () => {
		$scope.isModalConfirmed = true;
		httpSender.addDonationToProject(projectId,currentReward.donationAmount).then(res => {
			$scope.isRequestCompleted = true;
			$scope.$apply();
			console.log(res.data);
			setTimeout($scope.changeAnim,930);
		});
		// $mdDialog.hide();
	}
 }

	console.log(window.location.search);
	$scope.clearCurrentViewedProjectProperty();
	$scope.donate = (reward,ev) => {
		console.log('opening donation modal');
		$mdDialog.show({
      controller: DialogController,
      templateUrl: '/views/donateDialog.html',
			locals:{
				projectId:$scope.currentViewedProject._id,
				currentReward:reward,
				httpSender: viewProjectHttpMethods
			},
			// scope: $scope,
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application to prevent interaction outside of dialog
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    }).then(function (confirmTransaction) {
			console.log("finished donating");
			
    }, function () {
			console.log('You cancelled the dialog.');
			console.log($scope);
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