
import '../../css/addProject.css';
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
import Dropzone from 'dropzone';
import "dropzone/dist/dropzone.css";
import '../../vendors/fontawesome/css/fontawesome.min.css';
import '../../vendors/fontawesome/css/regular.css';
import '../../vendors/fontawesome/css/solid.css';





const AddProjectApp = angular.module('AddProjectApp', ['ngMaterial', 'ngMessages', 'addProjectModule', 'NavbarApp']);



AddProjectApp.controller('AddProjectController', ['$scope', 'addProjectHttpMethods', '$mdDialog', function ($scope, addProjectHttpMethods, $mdDialog) {
	$scope.project = {};
	$scope.rewards = [{}];
	$scope.isNext = false;
	Dropzone.autoDiscover = false;
	const dzOptions = {
		maxFiles: 1,
		acceptedFiles: 'image/*',
		autoProcessQueue: false,
		url: '/api/image',
		addRemoveLinks:true,
		clickable: ['div#icon-container', 'div#my-awesome-dropzone'],
		// previewTemplate: document.querySelector('#preview-container').innerHTML,	
		"error": function (file, message, xhr) {
			this.removeFile(file);
			alert(message);
		}
	}
	const myDropzone = new Dropzone("div#my-awesome-dropzone", dzOptions);
	myDropzone.on('thumbnail',(file,dataURL) => {
		console.log(file);
		$scope.file = file;
	
	});

	$scope.$watchCollection('rewards', () => {
		console.log('moving to bottom');
		window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
	});


	const verifyProjectDetails = project => {
		const projInfoEntries = Object.entries(project);
		console.log(project);
		if (projInfoEntries.length < 8) {
			alert("need to fill the entire form");
			return false;
		}
		const isNoData = projInfoEntries.find(element => !element[1]);
		if (isNoData) {
			alert("need to fill the entire form");
			return false;
		}

		if (isNaN(project.amountToRaise)) {
			alert("amount must be number");
			return false;
		}
		const bankDetailEntries = [project.bankID, project.bankBranchID, project.bankAccount];
		const isBankDetailsNotValid = bankDetailEntries.find((detail, index) => !detail.match(`/^[0-9]{${2 + index * index}}$/`));
		return isBankDetailsNotValid;
	}
	

	const verifyRewardsDetails = rewards => {
		if (rewards.length === 0) {
			alert("need to include at least 1 reward/donation option");
			return false;
		}
		const isOneInvalid = rewards.find(reward => !checkSingleReward(reward));
		return !isOneInvalid;
	}

	const checkSingleReward = reward => {
		const rewardInfoEntries = Object.entries(reward);
		if (rewardInfoEntries.length < 3) {
			alert("need to fill all reward details");
			return false;
		}

		const isEmptyRewardDetails = rewardInfoEntries.find(rewardDetail => !rewardDetail[1]);
		if (isEmptyRewardDetails) {
			alert("need to fill all reward details");
			return false;
		}

		if (reward.donationAmount) {
			if (isNaN(reward.donationAmount)) {
				alert("donation must be number");
				return false;
			}
		}
		return true;
	}

	$scope.verifyAndSend = () => {
		console.log($scope.file.dataURL);
		const isValidProject = verifyProjectDetails($scope.project);
		const isValidRewards = verifyRewardsDetails($scope.rewards);
		console.log("rewards: " + isValidRewards);
		console.log("project: " + isValidProject);
		if (isValidProject && isValidRewards) {
			$scope.project.rewards = $scope.rewards;
			$scope.project.thumbnail = $scope.file.dataURL;
			console.log($scope.project.thumbnail);
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
		}, () => {
			window.location.href = '/homepage';
		});
	}
	$scope.switchPage = () => {
		$scope.isNext = !$scope.isNext;
	}
	$scope.addDonationOption = () => {
		$scope.rewards.push({});
		const btn = document.getElementById('addRewardButton');
		console.log(btn);

	}
	$scope.removeDonationOption = reward => {
		$scope.rewards = $scope.rewards.filter(value => value !== reward)
	}

}]);


AddProjectApp.config(function ($mdThemingProvider) {

	// Configure a dark theme with primary foreground yellow

	$mdThemingProvider.theme('docs-dark', 'default')
		.primaryPalette('yellow')
		.dark();

});