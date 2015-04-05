angular.module('mtgApp').directive('frameHomePage', function() {
  return {
    restrict : "E",
    scope : { page : '&' },
    templateUrl : 'views/homePage.html',
    controller : 'homeCtrl'
  }
});
