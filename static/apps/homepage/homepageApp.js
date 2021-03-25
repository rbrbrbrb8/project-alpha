const homepageApp = angular.module('HomepageApp',[]);

homepageApp.directive('projectBox',[function(){




  return {
    restrict: 'E',
    scope: {
      title: '='
    },
    templateUrl:'../views/projectbox.html'
  };

}])