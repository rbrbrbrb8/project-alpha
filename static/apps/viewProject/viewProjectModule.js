const viewProjectModule = angular.module('viewProjectModule', []);
viewProjectModule.factory('viewProjectHttpMethods', ['$http', viewProjectHttpMethodsFunc]);

function viewProjectHttpMethodsFunc($http) {
	const httpService = {};

	httpService.requestCurrentViewedProjectInfo = function (query) {

		return $http({
			method: "GET",
			url: `/api/project${query}`,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

  httpService.addDonationToProject = function (projectId,donationAmount){

		return $http({
			method:'POST',
			url:`/api/project/donate`,
			data:{
				'donationAmount':donationAmount,
				'projectId':projectId
			},
			headers:{
				'Content-Type':'application/json'
			}
		})
  }
	return httpService;
};