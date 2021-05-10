const addProjectApp = angular.module('AddProjectApp',['ngMaterial','ngMessages']);

addProjectApp.controller('AddProjectController',['$scope',function($scope){
    $scope.printInfo = () =>{
        console.log($scope.project);  
    }
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

addProjectApp.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });