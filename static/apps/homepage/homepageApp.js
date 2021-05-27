
const homepageApp = angular.module('HomepageApp', ['ngMaterial']);


homepageApp.controller('HomepageController', ['$scope', '$http', async function ($scope, $http) {
	$scope.projects = [];
	$scope.getProjects = () => {
		$http.get(`/api/project/firstProjects`).then(res=>{
			console.log(res.data);
			$scope.projects= res.data.firstProjects;
		});

	}
	
	$scope.printProject = project => {
		console.log(project);
	}

	$scope.addProject = () => {
		console.log($scope.projects);
		$scope.projects.push({title:'nice'});
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
