angular.module('mtgApp').controller('topMenuCtrl', function( $scope, $http ) {
  $scope.topMenuAction = function( page ) {
    if( page == $scope.page )
      return;
    $scope.page = page;
  }
});
