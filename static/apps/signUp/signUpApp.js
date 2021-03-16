// 'use strict';
// require('./signUpModule');
const signUpApp = angular.module('SignUpApp',['signUpModule']);


signUpApp.controller('SignUpController',['$scope','httpMethods',function($scope,httpMethods){
    const validateDetails = function(username,password){
        let usernameValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{6,8}$");
        let passwordValidator = new RegExp("^(?![0-9]{6})[0-9a-zA-Z]{8,12}$");
        return usernameValidator.test(username) && passwordValidator.test(password);
    };
    $scope.msg_invalid_user = "Username must be 6-8 characters long, and contain only letters and numbers";
    $scope.msg_invalid_password = "Password must be 8-12 characters long, and contain only letters and numbers";
    $scope.signup = {};

    $scope.preventIfInvalid = function(event){
        console.log("got here");
        const isValid = validateDetails($scope.signup.username,$scope.signup.password);
        if(!isValid){
            event.preventDefault();
            console.log("event prevented, invalid username/password");
            alert("please enter valid username and password");
        };

    };
}]);