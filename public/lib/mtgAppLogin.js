angular.module("mtgAppLogin", [] )
.directive("frameLogin", function(  ) {
	return {
		restrict : "E",
		templateUrl : 'views/login.html',
		scope : {
			loginConnect : "&",
			showAlert : "&",
		},		
		controller : function($scope) {

			$scope.loginInfos = [{ "login" : " ", "pass" : " " }];

			$scope.tryConnect = function() {
				// Tests de connexion

				if( !$scope.loginInfos.login ) {
					$scope.showAlert({ msg : "Wrong login or password"});
					return false;
				}
				if( !$scope.loginInfos.pass ) {
					$scope.showAlert({ msg : "Wrong login or password"});
					return false;
				}

				// Connexion
				$scope.loginConnect();
			}


		}
	}
});