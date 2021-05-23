const addProjectApp = angular.module('AddProjectApp', ['ngMaterial', 'ngMessages', 'addProjectModule']);

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

		const bankDetailEntries = projInfoEntries.filter(element => element[0].includes("bank"));
		bankDetailEntries.forEach((element, i) => {
			const validator = new RegExp(`^[0-9]{${2 + i * i}}$`);
			if (validator.test(element[1])) return false;
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
			$scope.status = 'You decided to keep your debt.';
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

addProjectApp.directive('navbar', [function () {
	return {
		restrict: 'E',
		scope: {}, //add user info to scope so the navbar can load username and profile pic
		controller: function ($scope) {

		},
		templateUrl: 'views/navbar.html'


	}
}]);

addProjectApp.config(function ($mdThemingProvider) {

	// Configure a dark theme with primary foreground yellow

	$mdThemingProvider.theme('docs-dark', 'default')
		.primaryPalette('yellow')
		.dark();

});