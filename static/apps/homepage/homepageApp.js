const homepageApp = angular.module('HomepageApp',[]);


homepageApp.controller('HomepageController',['$scope',function($scope){
  
}]); 

homepageApp.directive('navbar',[function(){
    return{
        restrict: 'E',
        scope:{}, //add user info to scope so the navbar can load username and profile pic
        controller: function($scope){

        },
        templateUrl:'views/navbar.html'


    }
}]);