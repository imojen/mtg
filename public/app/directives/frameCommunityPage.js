angular.module('mtgApp').directive('frameCommunityPage', function() {
  return {
    restrict : "E",
    scope : { page : '&' },
    templateUrl : 'views/communityPage.html',
  }
});
