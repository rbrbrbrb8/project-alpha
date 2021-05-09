const addProjectApp = angular.module('AddProjectApp',['ngMaterial']);

addProjectApp.controller('AddProjectController',['$scope',function($scope){
  
}]); 

addProjectApp.directive('navbar',[function(){
    return{
        restrict: 'E',
        scope:{}, //add user info to scope so the navbar can load username and profile pic
        controller: function($scope){

        },
        templateUrl:'views/navbar.html'


    }
}]);