import '../../vendors/angular.min.js';
import '../../vendors/angular-material.min.js';
import '../../vendors/angular-animate.min.js';
import '../../vendors/angular-aria.min.js';
import '../../vendors/angular-cookies.min.js';
import '../../vendors/angular-messages.min.js';
import '../../vendors/bootstrap.min.js';
import './homepageModule.js';
import '../navbar/navbar.js';
import '../../vendors/angular-material.min.css';
import '../../vendors/bootstrap.min.css';
import '../../css/navbar.css';
import '../../css/homepage.css';
import '../../vendors/fontawesome/css/fontawesome.min.css';
import '../../vendors/fontawesome/css/regular.css';
import '../../vendors/fontawesome/css/solid.css';



const homepageApp = angular.module('HomepageApp', ['ngMaterial', 'ngCookies', 'homepageModule', 'NavbarApp']);



homepageApp.controller('HomepageController', ['$scope', '$http', 'homepageHttpMethods', '$rootScope', '$q', function ($scope, $http, homepageHttpMethods, $rootScope, $q) {

	$scope.projects = [];
	$scope.userInfo = {};
	const promiseUserInfo = homepageHttpMethods.getUserInfo()
		.then(res => {
			console.log('getUserInfo');
			return res.data;
		});
	const promiseGetProjects = homepageHttpMethods.getItemFromCache('firstProjects')
		.then(res => {
			return res.data;
		});

	const promiseGetProjectsIdList = homepageHttpMethods.getItemFromCache('idList')
		.then(res => {
			console.log('getProjects');
			return res.data;
		})
	$scope.changeClass = project => {
		project.isLiked = !project.isLiked;
	}

	const isLikedByUser = (userInfo, project) => userInfo.likedProjects[project._id];

	const isSupportedByUser = (userInfo, project) => userInfo.likedProjects[project._id];

	const getPercentage = project => Math.round((project.amountAlreadyRaised / project.amountToRaise) * 100);

	const setBarStyle = project => ({ 'width': `${project.percentage}%` });

	const fixProjectsArr = (projects,userInfo) => {
		return projects.map(project => {
			const newProject = { ...project };
			newProject.isLiked = isLikedByUser(userInfo, newProject);
			newProject.isSupported = isSupportedByUser(userInfo, newProject);
			newProject.percentage = getPercentage(newProject);
			newProject.progressBarStyle = setBarStyle(newProject);
			return newProject;
		});
	}

	$scope.initInfo = () => {
		$q.all([promiseUserInfo, promiseGetProjects, promiseGetProjectsIdList]).then(res => {
			const [userInfo, projects, projectsIds] = res;
			console.log(res);
			const fixProjects = fixProjectsArr((Array.isArray(projects) ? projects : [projects]),userInfo);
			$scope.getImages(fixProjects);
			$scope.projects = fixProjects;
			$scope.lastProjectShownIndex = fixProjects.length - 1;
			$scope.projectsIds = projectsIds;
		});
	};

	$scope.getImages = projects => {
		projects.forEach(project => {
			if (project.thumbnailID) homepageHttpMethods.getImage(project.thumbnailID)
				.then(res => {
					console.log(res.data);
					project.thumbnail = res.data.dataURL;
				})
		});
	}


	$scope.moveToProfile = userId => {
		console.log(userId);
		window.location.href = `/userProfile?creatorUserID=${userId}`
	}

	$scope.moveToProject = project => {
		console.log(project);
		window.localStorage.setItem('currentViewedProject', JSON.stringify(project));
		window.location.href = `/viewProject?_id=${project._id}`
	}
	$scope.likeProject = (project) => {
		console.log("liking project: ", project._id);

		homepageHttpMethods.addLikeToProject(project._id, project.isLiked).then(res => {
			console.log(res.data);
			project.isLiked = !project.isLiked;
			$scope.userInfo.likedProjects[project._id] = !$scope.userInfo.likedProjects[project._id];
			window.localStorage.setItem('UserInfo', JSON.stringify($scope.userInfo));
			const test = JSON.parse(window.localStorage.getItem('UserInfo'));
			console.log(test);
		});

	}

	$scope.showMore = (projectsIds, lastProjectsShownIndex) => {
		console.log(lastProjectsShownIndex);
		$scope.loadingDocs = true;
		const idsArr = projectsIds.slice(lastProjectsShownIndex + 1, lastProjectsShownIndex + 5);
		console.log(idsArr);
		const searchQuery = '?_id=' + JSON.stringify(idsArr);
		homepageHttpMethods.requestProjects(searchQuery).then(res => {
			const newProjects = res.data;
			$scope.getImages(newProjects);
			$scope.projects = $scope.projects.concat(newProjects);
			console.log($scope.projects);
			$scope.loadingDocs = false;
			$scope.lastProjectShownIndex += newProjects.length - 1;
		});
	}


}]);

