angular.module('mtgApp', [ "mtgAppLogin", "mtgAppHome", "mtgAppAlert" ])
.controller("mtgAppController",function( $scope ) {

	/* Login */
	$scope.isLogged = false;
	$scope.loginConnect = function() {
		alert("Connected => Go to home");
		$scope.isLogged = true;
	}

	/* Alert */
	$scope.alertShow = false;
	$scope.alertMsg = "";
	$scope.showAlert = function( msg ) {
		$scope.alertMsg = msg;
		$scope.alertShow = true;
	}



});