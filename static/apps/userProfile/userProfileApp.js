
import '../../vendors/angular.min.js';
import '../../vendors/angular-material.min.js';
import '../../vendors/angular-animate.min.js';
import '../../vendors/angular-aria.min.js';
import '../../vendors/angular-cookies.min.js';
import '../../vendors/angular-messages.min.js';
import 'bootstrap';
import '../../images/profile-background.jpg'
import './userProfileModule.js';
import '../navbar/navbar.js';
import '../../vendors/angular-material.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/navbar.css';
import '../../css/userProfile.css';
import ngInfiniteScroll from 'ng-infinite-scroll';


const userProfileApp = angular.module('UserProfileApp', ['ngCookies', 'userProfileModule', 'NavbarApp', 'infinite-scroll']);


userProfileApp.controller('userProfileController', ['$scope', 'userProfileHttpMethods', function ($scope, userProfileHttpMethods) {
	//wrong!!!! get from db and then do length
	$scope.projects = [1, 2, 3];
	$scope.totalMoneyRaised = 0;
	$scope.user = {};
	const query = window.location.search;
	console.log(query);

	$scope.getImages = projects => {
		projects.forEach(project => {
			if (project.thumbnailID) homepageHttpMethods.getImage(project.thumbnailID)
				.then(res => {
					console.log(res.data);
					project.thumbnail = res.data.dataURL;
				})
		});
		// $scope.projects = projects;
	}

	$scope.initInfo = () => {
		userProfileHttpMethods.requestProjects(query).then(res => {
			console.log('got request project response');
			const projects = res.data;
			
			$scope.totalMoneyRaised = projects.reduce((total, project) => total + project.amountAlreadyRaised, 0);
			$scope.lastProjectShownIndex = 4;
			$scope.getImages(projects);
			$scope.projects = projects;
		});
		userProfileHttpMethods.requestProjectsIds(query).then(res => {
			$scope.projectsStarted = res.data.map(projectId => projectId._id);
		});
	}

	// userProfileHttpMethods.requestUserProjects(query).then(res => {
	// 	console.log(res.data);
	// 	$scope.projectsStarted = res.data[0];
	// 	const projects = res.data[1];
	// 	$scope.projects = projects;
	// 	$scope.totalMoneyRaised = $scope.projects.reduce((total, project) => total + project.amountAlreadyRaised, 0);
	// 	$scope.lastProjectShownIndex = 5;
	// 	$scope.getImages(projects);
	// });
	userProfileHttpMethods.requestUserInfo(query).then(res => {
		$scope.user = res.data;
	});

	$scope.showMore = (projectsIds,lastProjectsShownIndex) => {
		console.log(lastProjectsShownIndex);
		$scope.loadingDocs = true;
		const idsArr = projectsIds.slice(lastProjectsShownIndex + 1, lastProjectsShownIndex +5);
		console.log(idsArr);
		const searchQuery = '?_id=' + JSON.stringify(idsArr);
		userProfileHttpMethods.requestProjects(searchQuery).then(res => {
			const newProjects = res.data;
			$scope.projects = $scope.projects.concat(newProjects);
			console.log($scope.projects);
			// $scope.getImages(newProjects);
			$scope.loadingDocs = false;
			$scope.lastProjectShownIndex+=4;
		});
	}

}]);
