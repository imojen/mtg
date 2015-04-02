var directives = {};

directives.frameHome = function() {
	return {
		restrict : "E",
		scope : {
			loginDisconnect : "&",
		},
		templateUrl : 'views/home.html',
		controller : function($scope, $http) {

			$scope.page = 'library';
			

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
				if( h < 750 ) h = 750;
				if( w < 990 ) w = 990;
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
		controller : function($scope, $http) {

			// Fix library height
			angular.element(document).ready(function () {
				if( $(".wrapperScroll").length ) {
					$(".wrapperScroll").on('scroll',function() {
						$(".scrollItem").css('top',$(this).scrollTop());
					});
				}
				$(".navbar-btn, .title").tooltip({placement:'top',container:'#library'});		
						
				fixLibrarySize();
				$(window).on('resize',function() {
					fixLibrarySize();
				});		

			});
			function fixLibrarySize() {
				var b = $("#main-body"),
					h = parseFloat(b.css('height'));
					val = parseInt((h-100)/2);

				console.log("bH : "+h+", val :"+val);

				if( val < 350 )
					val = 350;
				$(".cardListWrapper, .cardListTableWrapperTable, .tableResultsWrapper").css('height', val+"px" );
			}

		}
	}
}
directives.frameArenaPage = function() {
	return {
		restrict : "E",
		scope : { page : '&' },
		templateUrl : 'views/arenaPage.html',
	}
}
directives.frameCommunityPage = function() {
	return {
		restrict : "E",
		scope : { page : '&' },
		templateUrl : 'views/communityPage.html',
	}
}







mtgApp.directive( directives );