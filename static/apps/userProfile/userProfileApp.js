
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
		$scope.projects = projects;
	}

	$scope.initInfo = () => {
		userProfileHttpMethods.requestProjects(query).then(res => {
			const projects = res.data;
			$scope.projects = projects;
			$scope.totalMoneyRaised = projects.reduce((total, project) => total + project.amountAlreadyRaised, 0);
			$scope.lastProjectShownIndex = 4;
			$scope.getImages(projects);
		});
		userProfileHttpMethods.requestProjectsIds(query).then(res => {
			$scope.projectsStarted = res.data;
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
		console.log('requesting more projects...');
		$scope.loadingDocs = true;
		const idsArr = projectsIds.slice(lastProjectsShownIndex+1,lastProjectsShownIndex+5);
		const searchQuery = '?_id' + idsArr.toString();
		userProfileHttpMethods.requestProjects(searchQuery).then(res => {
			console.log('requested more projects, heres the data: ');
			console.log(res.data);
		});
	}

}]);
