angular.module('mtgApp').directive('frameHome', function() {
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
});
