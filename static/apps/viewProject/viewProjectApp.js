const viewProjectApp = angular.module('ViewProjectApp', ['ngMaterial', 'ngCookies','viewProjectModule']);

viewProjectApp.controller('viewProjectController',['$scope', '$timeout','$mdDialog','viewProjectHttpMethods', function ($scope, $timeout,$mdDialog,viewProjectHttpMethods) {
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
	$scope.afterSec=false;
	$scope.paymentDetails = {};

	const verifyPaymentDetails = paymentDetails => {
		// const projInfoEntries = Object.entries(paymentDetails);
		console.log(paymentDetails);
		// if (projInfoEntries.length < 8) {
		// 	alert("need to fill the entire form");
		// 	return false;
		// }
		// projInfoEntries.forEach(element => {
		// 	if (!element[1]) {
		// 		alert("need to fill the entire form");
		// 		return false;
		// 	}
		// });
		// const amountEntry = projInfoEntries.find(element => element[0].includes("amount"));
		// if (isNaN(amountEntry[1])) {
		// 	alert("amount must be number");
		// 	return false;
		// }

		// const bankDetailEntries = projInfoEntries.filter(element => element[0].includes("bank"));
		// bankDetailEntries.forEach((element, i) => {
		// 	const validator = new RegExp(`^[0-9]{${2 + i * i}}$`);
		// 	if (validator.test(element[1])) return false;
		// })
		// return true;
	}


	$scope.cancelTransaction = () => {
		console.log(projectId);
		console.log(currentReward);
		$mdDialog.cancel();
	};


	$scope.closeModal = () => {
		
	}

	$scope.changeAnim = () => {
		$scope.afterSec= true;
		console.log('switching message');
		$scope.transactionMessage = "Transaction Complete!";
		console.log($scope.afterSec);
		// $timeout($scope.closeModal(),600);
		// $scope.$apply();
	}
	$scope.submitTransaction = () => {
		verifyPaymentDetails($scope.paymentDetails);
		$scope.transactionMessage = "Sending Transaction";
		$scope.isModalConfirmed = true;
		$scope.isRequestCompleted = false;
		console.log()
		httpSender.addDonationToProject(projectId,currentReward.donationAmount).then(async res => {
			$scope.isRequestCompleted = true;
			// console.log(res.data);
			await $timeout($scope.changeAnim,930);
			console.log("hiding dialog");
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