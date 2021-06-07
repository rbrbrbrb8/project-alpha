const userProfileModule = angular.module('userProfileModule', []);
userProfileModule.factory('userProfileHttpMethods', ['$http', userProfileHttpMethodsFunc]);

function userProfileHttpMethodsFunc($http) {
	const httpService = {};
	httpService.requestUserProjects = function (query) {
		console.log("sending userProfile GET request");
		return $http({
			method: "GET",
			url: `/api/allProjects/extended${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	httpService.requestUserInfo = function (query) {
		console.log("sending userProfile GET request");
		return $http({
			method: "GET",
			url: `/api/userInfo/extended${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return httpService;
};