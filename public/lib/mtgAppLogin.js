angular.module("mtgAppLogin", [] )
.directive("frameLogin", function(  ) {
	return {
		restrict : "E",
		templateUrl : 'views/login.html',
		scope : {
			loginConnect : "&",
			showAlert : "&",
		},		
		controller : function($scope, $http) {

			$scope.loginInfos = [{ "login" : null, "pass" : null }];

			// Login
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
				if( $scope.httpLogin() )
					$scope.loginConnect();
			}

			$scope.httpLogin = function() {
				var method = 'POST';
				var inserturl = 'http://localhost:1337/login';
				var nodeDatas = {
				      'login' : $scope.loginInfos.login,
				      'pass' : $scope.loginInfos.pass,
				    };

				$http({
				    method: method,
				    url: inserturl,
				    data:  'nodeDatas='+JSON.stringify(nodeDatas),
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				}).
				success(function(response) {
					if( response.data.success )
						alert("YOUHOU !!!");
					else
						alert("Bouh...");
					return true;
				}).
				error(function(response) {
			        $scope.codeStatus = response || "Request failed";
					alert($scope.codeStatus);
					return false;
				});				
			}


			// Login guest
			$scope.loginGuest = function() {

				// Connexion
				$scope.loginConnect();
			}


			// Sign-up
			$scope.subscribe = false;
			$scope.signUp = function() {
				$scope.subscribe = true;
			}
			$scope.closeSignUp = function() {
				$scope.subscribe = false;	
			}

			$scope.signUpInfos = [{ "login" : null, "mail" : null, "pass" : null, "pass2" : null }];
			$scope.trySignUp = function() {
				// Tests
				if( !$scope.signUpInfos.login || !$scope.signUpInfos.mail || !$scope.signUpInfos.pass || !$scope.signUpInfos.pass2 ) {
					$scope.showAlert({ msg : "You must fill all the fields in order to complete your registration."});
					return false;					
				}
        		var regExpValidEmail = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "gi");
				if ( !$scope.signUpInfos.mail.match(regExpValidEmail)) {
					$scope.showAlert({ msg : "Please enter a valid mail adress."});
					document.getElementById("sign-up-mail").focus();
					return;
				}				
				if( $scope.signUpInfos.pass != $scope.signUpInfos.pass2 ) {
					$scope.showAlert({ msg : "Password confirmation failed"});
					document.getElementById("sign-up-pass2").focus();
					return false;										
				}


				// Sign up ok, connexion
				$scope.loginConnect();
			}

		}
	}
});