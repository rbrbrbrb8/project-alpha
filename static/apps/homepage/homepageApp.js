const homepageApp = angular.module('HomepageApp',[]);

homepageApp.run(function($http,$scope){
  $http.get('/homepage/api/getProjects').then((res) => {
    console.log("we have a response");
    console.log(res.data);
  });
}); 

homepageApp.controller('HomepageController',['$http','$scope',function($http,$scope){
  
}]); 

