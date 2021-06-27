const homepageModule = angular.module('homepageModule', []);
homepageModule.factory('homepageHttpMethods', ['$http', homepageHttpMethodsFunc]);

function homepageHttpMethodsFunc($http) {
	const httpService = {};

  httpService.addLikeToProject = function (projectId){
    console.log("sending like POST request");
		return $http({
			method:'POST',
			url:`/api/project/like`,
			data:{
				'projectId':projectId
			},
			headers:{
				'Content-Type':'application/json'
			}
		})
  }
	return httpService;
};