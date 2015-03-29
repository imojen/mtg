var mtgApp = angular.module('mtgApp', [ "ngRoute", "ngSanitize", "mtgAppLogin", "mtgAppAlert" ]);

// Main Controller
mtgApp.controller("mtgAppController", ["$scope", "$http", "$rootScope", "notification", function($scope, $http, $rootScope, notification) {

	/** Is connected user ? **/
	$scope.isConnecteduser = function() {
		var method = 'POST';
		//TODO REMOVE LOCALHOST !!!
		var inserturl = './login/isConnected';
		$http({
		    method: method,
		    url: inserturl,
		    data:  'nodeDatas=0',
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).
		success(function(response) {
			if(response.success) {
				$scope.isLogged = true;				
			}
		}).
		error(function(response) {
	        $scope.codeStatus = response || "Request failed";
			alert($scope.codeStatus);
			return false;
		});				
	}
	$scope.isConnecteduser();


	/* Login */
	$scope.isLogged = false;
	$scope.login = false;
	$scope.pseudo = false;
	$scope.loginConnect = function( login, pseudo ) {
		$scope.isLogged = true;
		$scope.login = login;
		$scope.pseudo = pseudo;
		//$scope.showAlert( login );
	}
	$scope.loginDisconnect = function() {
		$scope.isLogged = false;
	}

	/* Alert */
	$scope.notification = notification;

}]);