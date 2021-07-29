const navbarApp = angular.module('NavbarApp', []);

navbarApp.controller('NavbarController', ['$scope', function ($scope) {
  $scope.Uid = window.localStorage.getItem('Uid');
  $scope.moveToMyProjects= () => {
    window.location.href = `/projectsGeneral?creatorUserID=${$scope.Uid}`;
  };

  $scope.moveToSupportedProjects = () => {

  }

  $scope.moveToLikedProjects = () => {
    
  }

  $scope.moveToMyUser = Uid => {
		window.location.href = `/userProfile?creatorUserID=${Uid}`
	}
}]);

navbarApp.directive('navbar', [function () {
	return {
		restrict: 'E',
		scope: {}, //add user info to scope so the navbar can load username and profile pic
		controller: 'NavbarController',
		templateUrl: 'views/navbar.html'


	}
}]);



