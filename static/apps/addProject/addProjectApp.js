import '../../vendors/angular.min.js';
import '../../vendors/angular-material.min.js';
import '../../vendors/angular-animate.min.js';
import '../../vendors/angular-aria.min.js';
import '../../vendors/angular-cookies.min.js';
import '../../vendors/angular-messages.min.js';
import './addProjectModule.js';
import '../navbar/navbar.js';
import '../../vendors/angular-material.min.css';
import '../../css/navbar.css';
import '../../css/addProject.css';



const addProjectApp = angular.module('AddProjectApp', ['ngMaterial', 'ngMessages', 'addProjectModule','NavbarApp']);

addProjectApp.controller('AddProjectController', ['$scope', 'addProjectHttpMethods', '$mdDialog', function ($scope, addProjectHttpMethods, $mdDialog) {
	$scope.project = {};
	$scope.rewards = [{}, {}];
	$scope.isNext = false;
	const verifyProjectDetails = project => {
		const projInfoEntries = Object.entries(project);
		console.log(project);
		if (projInfoEntries.length < 8) {
			alert("need to fill the entire form");
			return false;
		}
		projInfoEntries.forEach(element => {
			if (!element[1]) {
				alert("need to fill the entire form");
				return false;
			}
		});
		const amountEntry = projInfoEntries.find(element => element[0].includes("amount"));
		if (isNaN(amountEntry[1])) {
			alert("amount must be number");
			return false;
		}
		let isValidBankDetails = true;
		const bankDetailEntries = projInfoEntries.filter(element => element[0].includes("bank"));
		bankDetailEntries.forEach((element, i) => {
			const validator = new RegExp(`^[0-9]{${2 + i * i}}$`);
			if (validator.test(element[1])) isValidBankDetails = false;
		})
		return true;
	}
	const verifyRewardsDetails = rewards => {
		let isValid = true;
		if (rewards.length === 0) {
			alert("need to include at least 1 reward/donation option");
			return false;
		}
		rewards.forEach(reward => {
			const rewardInfoEntries = Object.entries(reward);
			if (rewardInfoEntries.length < 3) {
				alert("need to fill all reward details");
				isValid = false;
			}
			rewardInfoEntries.forEach(element => {
				if (!element[1]) {
					alert("need to fill all reward details");
					isValid = false;
				}
			});
			const donationEntry = rewardInfoEntries.find(element => element[0].includes("donation"));
			if (donationEntry) {
				if (isNaN(donationEntry[1])) {
					alert("donation must be number");
					isValid = false;
				}
			}

		});
		return isValid;
	}
	$scope.verifyAndSend = () => {
		const isValidProject = verifyProjectDetails($scope.project);
		const isValidRewards = verifyRewardsDetails($scope.rewards);
		console.log("rewards: " + isValidRewards);
		console.log("project: " + isValidProject);
		if (isValidProject && isValidRewards) {
			$scope.project.rewards = $scope.rewards;
			addProjectHttpMethods.requestAddProject($scope.project).then(res => {
				console.log(res.data);
				$scope.showSuccessSaveDialog();
			});
			// addProjectHttpMethods.requestUpdateUserStartedProjects();
		}
	}
	$scope.showSuccessSaveDialog = () => {
		const confirm = $mdDialog.confirm()
			.title('Saved Successfully')
			.textContent('Your project has been successfully saved')
			.ariaLabel('Lucky day')
			.ok('Add Another Project')
			.cancel('Back To Homepage');

		$mdDialog.show(confirm).then(function () {
			window.location.href = '/addproject';
		}, function () {
			window.location.href = '/homepage';
		});
	}
	$scope.printRewards = () => {
		console.log($scope.rewards);
	}
	$scope.switchPage = () => {
		$scope.isNext = !$scope.isNext;
	}
	$scope.addDonationOption = () => {
		$scope.rewards.push({});
	}
	$scope.removeDonationOption = reward => {
		$scope.rewards = $scope.rewards.filter((value, index, arr) => {
			return value !== reward;
		})
	}
}]);


addProjectApp.config(function ($mdThemingProvider) {

	// Configure a dark theme with primary foreground yellow

	$mdThemingProvider.theme('docs-dark', 'default')
		.primaryPalette('yellow')
		.dark();

});