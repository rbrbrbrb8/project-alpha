const loginApp = angular.module('LoginApp',['loginModule']);


loginApp.controller('LoginController',['$scope','loginHttpMethods',function($scope,loginHttpMethods){
    const validateDetails = function(username,password){
        const usernameValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{6,8}$");
        const passwordValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{8,12}$");
        const isValidPassword = password ? passwordValidator.test(password) : false;
        const isValidUsername = username ? usernameValidator.test(username) : false;
        console.log(password);
        return isValidPassword && isValidUsername;
    };
    $scope.msg_invalid_user = "Username must be 6-8 characters long, and contain only letters and numbers";
    $scope.msg_invalid_password = "Password must be 8-12 characters long, and contain only letters and numbers";
    $scope.login = {};

    $scope.preventIfInvalid = function(event){
        console.log("got here");
        const isValid = validateDetails($scope.login.username,$scope.login.password);
        if(!isValid){
            event.preventDefault();
            console.log("event prevented, invalid username/password");
            alert("please enter valid username and password");
        }

    };
}]);