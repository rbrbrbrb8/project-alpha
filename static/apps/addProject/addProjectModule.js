const addProjectModule = angular.module('addProjectModule',[]);
addProjectModule.factory('addProjectHttpMethods',['$http',addProjectHttpMethodsFunc]);

function addProjectHttpMethodsFunc($http){
    const httpService = {};
    httpService.requestAddProject = project => {
        console.log("saving project");
        return $http({
            method:"POST",
            url:"/api/project",
            data:{
                project
            },
            headers:{
                'Content-Type':'application/json'
            }
        });
    }
    httpService.requestUpdateUserStartedProjects = () => {
        console.log("updating user started projects");
        return $http({
            method:"POST",
            url:"/api/userInfo",
            data:{
                
            },
            headers:{
                'Content-Type':'application/json'
            }
        });
    }
    return httpService;
};