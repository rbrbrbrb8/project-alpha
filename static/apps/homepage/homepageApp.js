
const homepageApp = angular.module('HomepageApp', ['ngMaterial','ngCookies','homepageModule','NavbarApp']);


homepageApp.controller('HomepageController', ['$scope', '$http','homepageHttpMethods', async function ($scope, $http,homepageHttpMethods) { //
	$scope.projects = [];
	$scope.getProjects = () => {
		$http.get(`/api/project/firstProjects`).then(res=>{
			console.log(res.data);
			$scope.projects= res.data.firstProjects;
		});

	};
	$scope.getUid = () => {
		$http.get(`/homepage/getUid`).then(res => {
			console.log(res.data);
			window.localStorage.setItem('Uid',res.data);
		})
	};
	$scope.getUid();

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
		});

	}
}]);

