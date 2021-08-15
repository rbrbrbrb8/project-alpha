const signUpModule = angular.module('signUpModule',[]);
signUpModule.factory('httpMethods',['$http',httpMethodsFunc]);

function httpMethodsFunc($http){
    const httpService = {};
    httpService.requestSignUp = function(username,password){
        return $http({
            method:"POST",
            url:"/signup",
            data:{
                username,
                password
            },
            headers:{
                'Content-Type':'application/json'
            }
        });
    }
    return httpService;
};