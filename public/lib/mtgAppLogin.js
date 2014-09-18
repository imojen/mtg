angular.module("mtgAppLogin", [] )
.directive("frameLogin", function() {
	return {
		restrict : "E",
		templateUrl : 'views/login.html',
		scope : {
			loginConnect : "&",
		},		
		controller : function($scope) {

			$scope.tryConnect = function() {
				// Tests de connexion

				// Connexion
				$scope.loginConnect();
			}

		}
	}
});