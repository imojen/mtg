mtgApp.directive("frameHome", function() {
	return {
		restrict : "E",
		scope : {
			loginDisconnect : "&",
		},
		templateUrl : 'views/home.html',
		controller : function($scope, $http) {
			$scope.disconnect = function() {
				$http({
				    method: 'POST',
				    url: '/login/disconnect',
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				}).
				success(function() {
					$scope.loginDisconnect();
				});			
			}
		}		
	}
});