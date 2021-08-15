
require('regenerator-runtime/runtime');
import '../../vendors/angular.min.js';
import '../../vendors/angular-material.min.js';
import '../../vendors/angular-animate.min.js';
import '../../vendors/angular-aria.min.js';
import '../../vendors/angular-cookies.min.js';
import '../../vendors/angular-messages.min.js';
import '../../vendors/bootstrap.min.js';
import './viewProjectModule.js';
import '../navbar/navbar.js';
import '../../vendors/angular-material.min.css';
import '../../vendors/bootstrap.min.css';
import '../../css/navbar.css';
import '../../css/viewProject.css';
import '../../css/donateDialog.css';


const viewProjectApp = angular.module('ViewProjectApp', ['ngMaterial', 'ngCookies', 'viewProjectModule','NavbarApp']);

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



	$scope.clearCurrentViewedProjectProperty();

	$scope.donate = (reward, ev) => {
		projectDetails.currentReward = reward;
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


		}, function () {
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


		if (!paymentDetails) return false;
		const paymentInfoEntries = Object.entries(paymentDetails);
		const nameTester = new RegExp('^([\w]{3,})+\s+([\w\s]{3,})+$', 'i');
		const numberTester = new RegExp('^[0-9]{16}$');
		const dateTester = new RegExp('^[\d]{2}\/[\d]{4}');
		const CVVtester = new RegExp('^[0-9]{3}$');

		if (paymentInfoEntries.length < 4) {
			alert("need to fill the entire form");
			return false;
		}

		const isOneEmpty = paymentInfoEntries.find(entry => !entry[1]);
		if(isOneEmpty){ 
			alert('need to fill out everything');
			return false;

		}

		if(nameTester.test(paymentDetails.cardholderName)) {

			return false;
		}
		if(!numberTester.test(paymentDetails.cardNumber)){

			return false;
		}
		if(dateTester.test(paymentDetails.cardExpiryDate)){

			return false;
		};
		if(!CVVtester.test(paymentDetails.cardCVV)){

			return false;
		};

		return true;
	}
	$scope.cancelTransaction = () => {

		$mdDialog.cancel();
	};
``
	$scope.changeAnim = () => {
		$scope.afterSec = true;

		$scope.transactionMessage = "Transaction Complete!";

	}
	$scope.submitTransaction = () => {
		const isValid = verifyPaymentDetails($scope.paymentDetails);

		if (isValid) {
			$scope.transactionMessage = "Sending Transaction";
			$scope.isModalConfirmed = true;
			$scope.isRequestCompleted = false;
			viewProjectHttpMethods.addDonationToProject(projectDetails.currentViewedProject._id, projectDetails.currentReward.donationAmount).then(async res => {
				$scope.isRequestCompleted = true;
				await $timeout($scope.changeAnim, 930);
				$timeout($mdDialog.hide,1000);
			});
		}
	}

}]);
