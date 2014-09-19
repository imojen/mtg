angular.module("mtgAppAlert", [] )
.directive("frameAlert", function(  ) {
	return {
		restrict : "E",
		templateUrl : 'views/alert.html',
		scope : {
			alertMsg : "=alertMsg",
			alertShow : "=alertShow",
		},		
		controller : function( $scope ) {

			$scope.hideAlert = function() {
				$scope.alertMsg = "";
				$scope.alertShow = false;
			}

		}
	}
});