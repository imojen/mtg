angular.module('mtgApp', [ "mtgAppLogin", "mtgAppHome" ])
.controller("mtgAppController",function( $scope ) {

	$scope.isLogged = false;

	$scope.loginConnect = function() {
		alert(1);
		$scope.isLogged = true;
	}


});