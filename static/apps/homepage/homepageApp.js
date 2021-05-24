
const homepageApp = angular.module('HomepageApp', ['ngMaterial']);


homepageApp.controller('HomepageController', ['$scope', '$http', async function ($scope, $http) {
	$scope.projects = []
	$scope.newProjects = []
	init = async () => {
		$http.get('/api/allprojects').then(res => {
			console.log(res.data);
			$scope.projects = res.data;
		});
	}
	await init();
	$scope.getProject = async project => {
		$http.get(`/api/project/${project._id}`).then(res=>{
			$scope.newProjects.push(res.data);
		});

	}
	
	$scope.assignData = (project, data) => {
		project = data;
		console.log(project)
	}

	$scope.printProject = project => {
		project = "yalla"
		console.log(project);
	}
}]);

homepageApp.directive('navbar', [function () {
	return {
		restrict: 'E',
		scope: {}, //add user info to scope so the navbar can load username and profile pic
		controller: function ($scope) {

		},
		templateUrl: 'views/navbar.html'


	}
}]);
