const loginModule = angular.module('loginModule',[]);
loginModule.factory('loginHttpMethods',['$http',loginHttpMethodsFunc]);

function loginHttpMethodsFunc($http){
    const httpService = {};
    httpService.requestLogin = function(username,password){
        console.log("sending login POST request");
        return $http({
            method:"POST",
            url:"/",
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