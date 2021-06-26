const viewProjectApp = angular.module('ViewProjectApp', ['ngMaterial', 'ngCookies', 'viewProjectModule']);

viewProjectApp.controller('viewProjectController', ['$scope', '$timeout', '$mdDialog', 'viewProjectHttpMethods', 'projectDetails', function ($scope, $timeout, $mdDialog, viewProjectHttpMethods, projectDetails) {
	$scope.clearCurrentViewedProjectProperty = () => {
		window.localStorage.removeItem('currentViewedProject');
	}
	const currentProjStr = window.localStorage.getItem('currentViewedProject');
	const query = window.location.search;
	if (currentProjStr) $scope.currentViewedProject = JSON.parse(window.localStorage.getItem('currentViewedProject'));
	else {
		$scope.currentViewedProject = {};
		viewProjectHttpMethods.requestCurrentViewedProjectInfo(query).then(res => {
			const resData = res.data;
			if (resData) $scope.currentViewedProject = resData;
		});
	}



	console.log(window.location.search);
	$scope.clearCurrentViewedProjectProperty();

	$scope.donate = (reward, ev) => {
		projectDetails.currentReward = reward;
		console.log('opening donation modal');
		$mdDialog.show({
			controller: 'DialogController',
			templateUrl: '/views/donateDialog.html',
			locals: {
				projectId: $scope.currentViewedProject._id,
				currentReward: reward
				// httpSender: viewProjectHttpMethods
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

viewProjectApp.factory('projectDetails', ['viewProjectHttpMethods', function (viewProjectHttpMethods) {
	const utils = {}
	const scope = {};
	utils.clearCurrentViewedProjectProperty = () => {
		window.localStorage.removeItem('currentViewedProject');
	}
	const currentProjStr = window.localStorage.getItem('currentViewedProject');
	const query = window.location.search;
	if (currentProjStr) scope.currentViewedProject = JSON.parse(window.localStorage.getItem('currentViewedProject'));
	else {
		scope.currentViewedProject = {};
		viewProjectHttpMethods.requestCurrentViewedProjectInfo(query).then(res => {
			const resData = res.data;
			if (resData) scope.currentViewedProject = resData;
		});
	}
	return scope;
}]);

viewProjectApp.controller('DialogController', ['$scope', '$mdDialog', 'projectDetails', 'viewProjectHttpMethods', '$timeout', function ($scope, $mdDialog, projectDetails, viewProjectHttpMethods, $timeout, projectId, currentReward) {
	$scope.isModalConfirmed = false;
	$scope.afterSec = false;

	const verifyPaymentDetails = paymentDetails => {
		console.log($scope.paymentDetails);

		if (!paymentDetails) return false;
		const paymentInfoEntries = Object.entries(paymentDetails);
		console.log(paymentInfoEntries);
		const nameTester = new RegExp('^([\w]{3,})+\s+([\w\s]{3,})+$', 'i');
		const numberTester = new RegExp('^[0-9]{16}$');
		const dateTester = new RegExp('^[\d]{2}\/[\d]{4}');
		const CVVtester = new RegExp('^[0-9]{3}$');

		let isNotEmpty = true;

		if (paymentInfoEntries.length < 4) {
			alert("need to fill the entire form");
			return false;
		}
		paymentInfoEntries.forEach((element, i) => {
			if (!element[1]) {
				console.log("wrong");
				isNotEmpty = false;
			}
		});
		if(!isNotEmpty) return false;

		if(nameTester.test(paymentDetails.cardholderName)) {
			console.log('failed name');
			return false;
		}
		if(!numberTester.test(paymentDetails.cardNumber)){
			console.log('failed number');
			return false;
		}
		if(dateTester.test(paymentDetails.cardExpiryDate)){
			console.log('failed exp');
			return false;
		};
		if(!CVVtester.test(paymentDetails.cardCVV)){
			console.log('failed CVV');
			return false;
		};

		return true;
	}
	$scope.cancelTransaction = () => {
		console.log(projectId);
		console.log(currentReward);
		$mdDialog.cancel();
	};


	$scope.closeModal = () => {

	}

	$scope.changeAnim = () => {
		$scope.afterSec = true;
		console.log('switching message');
		$scope.transactionMessage = "Transaction Complete!";
		console.log($scope.afterSec);
		// $timeout($scope.closeModal(),600);
		// $scope.$apply();
	}
	$scope.submitTransaction = () => {
		const isValid = verifyPaymentDetails($scope.paymentDetails);
		console.log(isValid);
		console.log("project details");
		console.log(projectDetails);
		if (isValid) {
			$scope.transactionMessage = "Sending Transaction";
			$scope.isModalConfirmed = true;
			$scope.isRequestCompleted = false;
			viewProjectHttpMethods.addDonationToProject(projectDetails.currentViewedProject._id, projectDetails.currentReward.donationAmount).then(async res => {
				$scope.isRequestCompleted = true;
				// console.log(res.data);
				await $timeout($scope.changeAnim, 930);
				console.log("hiding dialog");
				$timeout($mdDialog.hide,1000);
			});
		}
		// $mdDialog.hide();
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