var mtgApp = angular.module('mtgApp', [ "ngSanitize", "mtgAppLogin", "mtgAppAlert" ]);


// Main Controller
mtgApp.controller("mtgAppController",function( $scope, $http ) {

	/** Is connected user ? **/
	$scope.isConnecteduser = function() {
		var method = 'POST';
		//TODO REMOVE LOCALHOST !!!
		var inserturl = 'http://localhost:1337/login/isConnected';
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
	$scope.alertShow = false;
	$scope.alertMsg = "";
	$scope.showAlert = function( msg ) {
		$scope.alertMsg = msg;
		$scope.alertShow = true;
	}
	$scope.$on('showAlert', function(event, args) {
		$scope.showAlert( args );
	});


});