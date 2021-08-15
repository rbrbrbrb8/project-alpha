const addProjectModule = angular.module('addProjectModule', []);
addProjectModule.factory('addProjectHttpMethods', ['$http', addProjectHttpMethodsFunc]);

function addProjectHttpMethodsFunc($http) {
	const httpService = {};
	httpService.requestAddProject = (project,thumbnail) => {
		return $http({
			method: "POST",
			url: "/api/project",
			data: {
				project,
				thumbnail

			},
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return httpService;
};