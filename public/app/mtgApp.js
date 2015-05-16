var mtgApp = angular.module('mtgApp', [ "ngRoute", "ngSanitize", "mtgAppLogin", "mtgAppAlert" ]);

// Main Controller
mtgApp.controller("mtgAppController", ["$scope", "$http", "$rootScope", "notification", "socket", function($scope, $http, $rootScope, notification, socket) {

	$scope.isLogged = false;
	$scope.me = {};


	/** Is connected user ? **/
	$scope.isConnecteduser = function() {
		var method = 'POST';
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
				$scope.me.login = response.login,
				$scope.me.pseudo = response.pseudo,
				$scope.me.user = response.user;				
				socket.emit('connect_user',$scope.me,function(){});		
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
	$rootScope.loginConnect = function( login, pseudo, user ) {
		$scope.isLogged = true,
		$scope.me.login = login,
		$scope.me.pseudo = pseudo,
		$scope.me.user = user;
		socket.emit('connect_user' ,$scope.me,function(){});
	}
	$scope.loginDisconnect = function() {
		$scope.isLogged = false;
		socket.emit('deconnexion' ,{},function(){});
	}

	/* Alert */
	$scope.notification = notification;

	/** Nb utilisateurs en ligne **/
	$rootScope.nb_user_connected = 0;
	socket.emit('nb_user_connected',function(datas) {
		$rootScope.nb_user_connected = datas.nb;
	});
	socket.on('nb_user_connected',function(datas) {
		$rootScope.nb_user_connected = datas.nb;
	});
	

}]);