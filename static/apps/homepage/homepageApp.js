
const homepageApp = angular.module('HomepageApp', ['ngMaterial','ngCookies']);


homepageApp.controller('HomepageController', ['$scope', '$http','$cookies','$rootScope', async function ($scope, $http,$cookies,$rootScope) {
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
	$scope.likeProject = projectId => {
		console.log(projectId);
	}
}]);

homepageApp.directive('navbar', [function () {
	return {
		restrict: 'E',
		scope: {}, //add user info to scope so the navbar can load username and profile pic
		controller: function ($scope) {
			$scope.Uid = window.localStorage.getItem('Uid');
			$scope.moveToMyProjects= () => {
				window.location.href = `/projectsGeneral?creatorUserID=${$scope.Uid}`;
			};

			$scope.moveToSupportedProjects = () => {

			}

			$scope.moveToLikedProjects = () => {
				
			}
		},
		templateUrl: 'views/navbar.html'


	}
}]);
