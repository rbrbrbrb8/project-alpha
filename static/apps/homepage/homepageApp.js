
const homepageApp = angular.module('HomepageApp', ['ngMaterial','ngCookies','homepageModule','NavbarApp']);



homepageApp.controller('HomepageController', ['$scope', '$http','homepageHttpMethods', async function ($scope, $http,homepageHttpMethods) {

	$scope.projects = [];
	$scope.userInfo = {};
	const promiseUserInfo = $http.get(`/homepage/getUserInfo`).then(res => { //prev was getUserInfo function
		console.log(res.data);
		window.localStorage.setItem('UserInfo',JSON.stringify(res.data));
		$scope.userInfo = res.data;
		return true;
	});
	const promiseGetProjects = $http.get(`/api/project/firstProjects`).then(res=>{ //prev was getProjects function
		// console.log(res.data);
		$scope.projects= res.data.firstProjects;
		return true;
	});

	

	$scope.sortIsLiked = () => {
		$scope.projects.forEach(project => {
			console.log(project.title," is ", $scope.userInfo.likedProjects[project._id]);
			project.isLiked = $scope.userInfo.likedProjects[project._id] ? true : false;
		});
		// console.log($scope.projects);
	}

	$scope.sortIsSupported = () => {
		$scope.projects.forEach(project => {
			project.isSupported = $scope.userInfo.supportedProjects[project._id] ? true : false;
		});
		// console.log($scope.projects);
	}

	$scope.initInfo = async () => {
		const resultPromises = await Promise.all([promiseUserInfo,promiseGetProjects]); 
		// console.log(resultPromises);
		$scope.sortIsLiked();
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

