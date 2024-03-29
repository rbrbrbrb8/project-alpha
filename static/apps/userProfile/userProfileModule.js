const userProfileModule = angular.module('userProfileModule', []);
userProfileModule.factory('userProfileHttpMethods', ['$http', userProfileHttpMethodsFunc]);

function userProfileHttpMethodsFunc($http) {
	const httpService = {};
	httpService.requestUserProjects = function (query) {
		return $http({
			method: "GET",
			url: `/api/allProjects/extended${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	httpService.requestProjectsIds = function (query) {
		return $http({
			method: "GET",
			url: `/api/allProjects/${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	httpService.requestUserInfo = function (query) {
		return $http({
			method: "GET",
			url: `/api/userInfo/${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	httpService.getImage = function (id) {
		return $http({
			method: "GET",
			url: `/api/image?_id=${id}`,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	httpService.requestProjects = function (query) { //arr of ids converted to string with arr.toString()
		return $http({
			method: "GET",
			url: `/api/allProjects/extended${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return httpService;
};