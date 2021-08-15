const homepageModule = angular.module('homepageModule', []);
homepageModule.factory('homepageHttpMethods', ['$http', homepageHttpMethodsFunc]);

function homepageHttpMethodsFunc($http) {
	const httpService = {};

  httpService.addLikeToProject = function (projectId,isLiked){
		return $http({
			method:'POST',
			url:`/api/project/like`,
			data:{
				projectId,
				isLiked
			},
			headers:{
				'Content-Type':'application/json'
			}
		})
  }

	httpService.getUserInfo = function(){
		return $http({
			method: "GET",
			url: `/homepage/getUserInfo`,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	httpService.getImage = function(id){
		return $http({
			method: "GET",
			url: `/api/image?_id=${id}`,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	httpService.getFirstProjects = function(){
		return $http({
			method: "GET",
			url: `/api/project/firstProjects`,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	httpService.getItemFromCache = function(key){
		return $http({
			method: "GET",
			url: `/api/project/cache?key=${key}`,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
	return httpService;
};