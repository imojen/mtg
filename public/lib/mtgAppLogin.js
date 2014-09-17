angular.module("mtgAppLogin", [] )
.directive("frameLogin", function() {
	return {
		restrict : "E",
		scope : {
			isLogged: "=",
		},
		templateUrl : 'views/login.html'
	}
});