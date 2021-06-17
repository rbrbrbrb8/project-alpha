const userProfileModule = angular.module('userProfileModule', []);
userProfileModule.factory('userProfileHttpMethods', ['$http', userProfileHttpMethodsFunc]);

function userProfileHttpMethodsFunc($http) {
	const httpService = {};

	httpService.requestUserInfo = function (query) {
		console.log("sending userProfile GET request");
		return $http({
			method: "GET",
			url: `/api/userInfo/${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
	return httpService;
};