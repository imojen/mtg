angular.module('mtgApp', [ "mtgAppLogin", "mtgAppHome" ])
.controller("mtgAppController",function( $scope ) {

	$scope.isLogged = false;


});