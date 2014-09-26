var events = require('events');
var directives = {};

directives.frameHome = function() {
	return {
		restrict : "E",
		scope : {
			loginDisconnect : "&",
		},
		templateUrl : 'views/home.html',
		controller : function($scope, $http) {

			$scope.page = 'home';
			$scope.$on('changePage', page )

			$scope.disconnect = function() {
				if( !confirm("Disconnect ?") ) return false;
				$http({
				    method: 'POST',
				    url: '/login/disconnect',
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				}).
				success(function() {
					$scope.loginDisconnect();
				});			
			}

			// Fix menu height
			angular.element(document).ready(function () {
				fixSizes();
				$(window).on('resize',function() {
					fixSizes();
				});				
			});

			function fixSizes() {
				var h = $(window).height(),
					w = $(window).width(),
					b = $("#main-body");
				b.css({
					'width' : w - 40,
					'height' : h -80,
				});
			}

		}		
	}
};


directives.frameHomePage = function() {
	return {
		restrict : "E",
		scope : { page : '&' },
		templateUrl : 'views/homePage.html',
	}
}
directives.frameLibraryPage = function() {
	return {
		restrict : "E",
		scope : { page : '&' },
		templateUrl : 'views/libraryPage.html',
	}
}







mtgApp.directive( directives );