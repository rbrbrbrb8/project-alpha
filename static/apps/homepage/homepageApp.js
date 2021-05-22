const homepageApp = angular.module('HomepageApp',['ngMaterial']);


homepageApp.controller('HomepageController',['$scope',function($scope){
  $scope.printInit = () => {
      setTimeout(console.log("initializing card..."),500);
     
  }
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