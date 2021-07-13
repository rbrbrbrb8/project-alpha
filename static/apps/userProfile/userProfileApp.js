
import '../../vendors/angular.min.js';
import '../../vendors/angular-material.min.js';
import '../../vendors/angular-animate.min.js';
import '../../vendors/angular-aria.min.js';
import '../../vendors/angular-cookies.min.js';
import '../../vendors/angular-messages.min.js';
import 'bootstrap';
import '../../images/profile-background.jpg'
import './userProfileModule.js';
import '../navbar/navbar.js';
import '../../vendors/angular-material.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/navbar.css';
import '../../css/userProfile.css';



const userProfileApp = angular.module('UserProfileApp', [ 'ngCookies', 'userProfileModule','NavbarApp']); 


userProfileApp.controller('userProfileController', ['$scope', 'userProfileHttpMethods', function ($scope, userProfileHttpMethods) {
	 //wrong!!!! get from db and then do length
	$scope.projects = [1, 2, 3];
	$scope.totalMoneyRaised = 0;
	$scope.user = {};
	const query = window.location.search;
	console.log(query);
	userProfileHttpMethods.requestUserProjects(query).then(res => {
		console.log(res.data);
		$scope.projects = res.data[1];
		$scope.totalMoneyRaised = $scope.projects.reduce((total,project) => total + project.amountAlreadyRaised,0);
	});
	userProfileHttpMethods.requestUserInfo(query).then(res => {
		console.log(res.data);
		$scope.user = res.data;
	});

	

}]);
