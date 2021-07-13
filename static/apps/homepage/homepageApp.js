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



const homepageApp = angular.module('HomepageApp', ['ngMaterial','ngCookies','homepageModule','NavbarApp']);



homepageApp.controller('HomepageController', ['$scope', '$http','homepageHttpMethods','$rootScope','$q',function ($scope, $http,homepageHttpMethods,$rootScope,$q) {

	$scope.projects = [];
	$scope.userInfo = {};
	const promiseUserInfo = homepageHttpMethods.getUserInfo()
	.then(res => { //prev was getUserInfo function
		console.log('getUserInfo');
		//console.log(res.data);
		//window.localStorage.setItem('UserInfo',JSON.stringify(res.data));
		return res.data;
	});
	const promiseGetProjects = homepageHttpMethods.getFirstProjects().then(res=>{ //prev was getProjects function
		console.log('getProjects');
		return res.data.firstProjects;
	});

	$scope.changeClass = project => {
		project.isLiked = !project.isLiked;
	}

	$scope.sortIsLiked = () => {
		$scope.projects.forEach(project => {
			project.isLiked = $scope.userInfo.likedProjects[project._id] ? true : false;
		});
	}

	$scope.sortIsSupported = () => {
		$scope.projects.forEach(project => {
			console.log(project.title," is ", $scope.userInfo.supportedProjects[project._id]);
			project.isSupported = $scope.userInfo.supportedProjects[project._id] ? true : false;
		});
		// console.log($scope.projects);
	}

	$scope.sortProgress = () => {
		$scope.projects.forEach(project => {
			project.percentage = Math.round((project.amountAlreadyRaised/project.amountToRaise)*100);
			console.log(project.percentage);
			project.progressBarStyle = {
				'width' : `${project.percentage}%`
			};
		});
		// console.log($scope.projects);
	}

	const isLikedByUser = (userInfo,project) => userInfo.likedProjects[project._id];

	const isSupportedByUser = (userInfo,project) => userInfo.likedProjects[project._id];

	const getPercentage = project =>  Math.round((project.amountAlreadyRaised/project.amountToRaise)*100);

	const setBarStyle = project => ({'width':`${project.percentage}%`});

	$scope.initInfo = () => {
		 $q.all([promiseUserInfo,promiseGetProjects]).then(res => {
			const [userInfo, projects] = res;
			console.log(res);
			const fixProjects = projects.map(project => {
				const newProject = {...project};
				newProject.isLiked = isLikedByUser(userInfo, newProject);
				newProject.isSupported = isSupportedByUser(userInfo, newProject);
				newProject.percentage = getPercentage(newProject);
				newProject.progressBarStyle = setBarStyle(newProject);
				return newProject;
			});
			$scope.projects = fixProjects;
			console.log($scope.projects);
		}); 
		// console.log(resultPromises);
		
		// $scope.$apply();
	};


	$scope.moveToProfile = userId => {
		console.log(userId);
		window.location.href = `/userProfile?creatorUserID=${userId}`
	}

	$scope.moveToProject = project => {
		console.log(project);
		window.localStorage.setItem('currentViewedProject',JSON.stringify(project));
		window.location.href = `/viewProject?_id=${project._id}`
	}
	$scope.likeProject = (project) => {
		console.log("liking project: ",project._id);

		homepageHttpMethods.addLikeToProject(project._id,project.isLiked).then(res => {
			console.log(res.data);
			project.isLiked = !project.isLiked;
			$scope.userInfo.likedProjects[project._id] = !$scope.userInfo.likedProjects[project._id];
			window.localStorage.setItem('UserInfo',JSON.stringify($scope.userInfo));
			const test = JSON.parse(window.localStorage.getItem('UserInfo'));
			console.log(test);
		});

	}
}]);

