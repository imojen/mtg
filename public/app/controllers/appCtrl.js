var controllers = {};


controllers.topMenuCtrl = function( $scope, $http ) {

	$scope.topMenuAction = function( page ) {
		$scope.page = page;
	}

}

controllers.homeCtrl = function( $scope, $http ) {

	$scope.coucou = function() {
		alert('coucou');
	}

}


controllers.libraryCtrl = function( $scope, $http ) {

}

mtgApp.controller( controllers );