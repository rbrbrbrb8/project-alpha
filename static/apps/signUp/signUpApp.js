// 'use strict';
// require('./signUpModule');
const signUpApp = angular.module('SignUpApp',['signUpModule']);


signUpApp.controller('SignUpController',['$scope','httpMethods',function($scope,httpMethods){
    const validateUsername = function(username){
        console.log(username);
        return true;
    };
    const validatePassword = function(password){
        console.log(password);
        return true;
    };
    $scope.msg_invalid_user = "Username must be 6-8 characters long, and contain only letters and numbers";
    $scope.msg_invalid_password = "Password must be 8-12 characters long, and contain only letters and numbers";
    $scope.signup = {};

    $scope.addToDb = function(){
        console.log("got here");
        if(validateUsername($scope.signup.username) && validatePassword($scope.signup.password)){
            httpMethods.requestSignUp($scope.signup.username,$scope.signup.password)
            .then( res => {
                console.log(res.data);
            })
        };

    };
}]);