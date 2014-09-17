angular.module("mtgAppHome", [] )
.directive("frameHome", function() {
	return {
		restrict : "E",
		scope : {
			isLogged: "=",
		},
		templateUrl : 'views/home.html'
	}
});