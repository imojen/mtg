angular.module('mtgApp').directive('frameArenaPage', function() {
  return {
    restrict : "E",
    scope : { page : '&' },
    templateUrl : 'views/arenaPage.html',
  }
});
