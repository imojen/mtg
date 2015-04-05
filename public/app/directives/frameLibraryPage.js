angular.module('mtgApp').directive('frameLibraryPage', function() {
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
});
