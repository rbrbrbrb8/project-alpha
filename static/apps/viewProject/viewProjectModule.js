const viewProjectModule = angular.module('viewProjectModule', []);
viewProjectModule.factory('viewProjectHttpMethods', ['$http', viewProjectHttpMethodsFunc]);

function viewProjectHttpMethodsFunc($http) {
	const httpService = {};

	httpService.requestCurrentViewedProjectInfo = function (query) {
		console.log("sending viewProject GET request");
		return $http({
			method: "GET",
			url: `/api/project${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

  httpService.addDonationToProject = function (){
    console.log("sending donation POST request");
  }
	return httpService;
};