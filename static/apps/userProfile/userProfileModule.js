const userProfileModule = angular.module('userProfileModule', []);
userProfileModule.factory('userProfileHttpMethods', ['$http', userProfileHttpMethodsFunc]);

function userProfileHttpMethodsFunc($http) {
	const httpService = {};
	httpService.requestUserProjects = function (userId) {
		console.log("sending userProfile POST request");
		return $http({
			method: "GET",
			url: `/api/allProjects/extended?creatorUserName=${userId}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return httpService;
};