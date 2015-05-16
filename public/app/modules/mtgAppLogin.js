angular.module("mtgAppLogin", [] )
.directive("frameLogin", function(  ) {
	return {
		restrict : "E",
		templateUrl : 'views/login.html',
		scope : {},		
		controller : function($rootScope, notification, $scope, $http) {

			$scope.loginInfos = [{ "login" : null, "pass" : null }];


			$scope.checkEnterLogin = function( e ) {
				if( e.keyCode == 13 ) {
					e.preventDefault();
					$scope.tryConnect();
				}
			}

			// Login
			$scope.tryConnect = function() {
				// Tests de connexion

				if( !$scope.loginInfos.login ) {
					notification.showAlert("Wrong login or password");
					return false;
				}
				if( !$scope.loginInfos.pass ) {
					notification.showAlert("Wrong login or password");
					return false;
				}

				// Connexion
				if( $scope.httpLogin() )
					$scope.loginConnect();
			}

			$scope.httpLogin = function() {
				var method = 'POST';
				var inserturl = './login';
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
					if(response.success) {
						$scope.loginInfos.login = "";
						$scope.loginInfos.pass = "";
						$rootScope.loginConnect( response.login, response.pseudo, response.user );
					}
					else {
						notification.showAlert("Wrong login or password");
						return false;
					}
						
				}).
				error(function(response) {
			        $scope.codeStatus = response || "Request failed";
					alert($scope.codeStatus);
					return false;
				});				
			}


			// Login guest
			$scope.loginGuest = function() {
				notification.showAlert("Not developped yet...");
				return false;
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
					notification.showAlert("You must fill all the fields in order to complete your registration.");
					return false;					
				}
        		var regExpValidEmail = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "gi");
				if ( !$scope.signUpInfos.mail.match(regExpValidEmail)) {
					notification.showAlert("Please enter a valid mail adress.");
					document.getElementById("sign-up-mail").focus();
					return;
				}				
				if( $scope.signUpInfos.pass != $scope.signUpInfos.pass2 ) {
					notification.showAlert("Password confirmation failed");
					document.getElementById("sign-up-pass2").focus();
					return false;										
				}


				// Sign up ok, connexion
				$scope.signUpNode();
			}

			$scope.signUpNode = function() {
				var method = 'POST';
				//TODO REMOVE LOCALHOST !!!
				var inserturl = './login/signup';
				var nodeDatas = {
				      'login' : $scope.signUpInfos.login,
				      'mail' : $scope.signUpInfos.mail,
				      'pass' : $scope.signUpInfos.pass,
				    };

				$http({
				    method: method,
				    url: inserturl,
				    data:  'nodeDatas='+JSON.stringify(nodeDatas),
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				}).
				success(function(response) {
					if(response.success) {
						$scope.showAlert({ msg : response.successMsg });
						$scope.signUpInfos.login = "";
						$scope.signUpInfos.mail = "";
						$scope.signUpInfos.pass = "";
						$scope.signUpInfos.pass2 = "";
						$scope.subscribe = false;
						$scope.loginConnect();
					}
					else {
					 	notification.showAlert(response.errMsg);
						return false;
					}
						
				}).
				error(function(response) {
			        $scope.codeStatus = response || "Request failed";
  					notification.showAlert($scope.codeStatus);
					return false;
				});				
			}
		}
	}
});