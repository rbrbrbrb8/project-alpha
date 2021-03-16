const loginApp = angular.module('LoginApp',['loginModule']);


loginApp.controller('LoginController',['$scope','loginHttpMethods',function($scope,loginHttpMethods){
    const validateDetails = function(username){
        let usernameValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{6,8}$");
        let passwordValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{8,12}$");
        return usernameValidator.test(username) && passwordValidator.test(password);
    };
    $scope.msg_invalid_user = "Username must be 6-8 characters long, and contain only letters and numbers";
    $scope.msg_invalid_password = "Password must be 8-12 characters long, and contain only letters and numbers";
    $scope.login = {};

    $scope.checkCredentialsAndLogin = function(){
        console.log("got here");
        const isValid = validateDetails($scope.login.username,$scope.login.password);
        if(!isValid){
            loginHttpMethods.requestLogin($scope.login.username,$scope.login.password)
            .then(res => {
                console.log(res.data);
            
            })
        };

    };
}]);