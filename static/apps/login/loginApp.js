const loginApp = angular.module('LoginApp',['loginModule']);


loginApp.controller('LoginController',['$scope','loginHttpMethods',function($scope,loginHttpMethods){
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
    $scope.login = {};

    $scope.checkCredentialsAndLogin = function(){
        console.log("got here");
        if(validateUsername($scope.login.username) && validatePassword($scope.login.password)){
            loginHttpMethods.requestLogin($scope.login.username,$scope.login.password)
            .then(res => {
                console.log(res.data);
            })
        };

    };
}]);