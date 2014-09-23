var mtgApp = angular.module('mtgApp', [ "mtgAppLogin", "mtgAppAlert" ])
.controller("mtgAppController",function( $scope, $http ) {

	/** Is connected user ? **/
	$scope.isConnecteduser = function() {
		var method = 'POST';
		var inserturl = 'http://localhost:1337/login/isConnected';
		$http({
		    method: method,
		    url: inserturl,
		    data:  'nodeDatas=0',
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).
		success(function(response) {
			if(response.success)
				$scope.isLogged = true;				
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
	$scope.loginConnect = function() {
		$scope.isLogged = true;
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



});