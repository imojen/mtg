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
            $(this).find(".scrollItem").css('top',$(this).scrollTop());
          });
        }
        $(".navbar-btn, .title").tooltip({placement:'top',container:'#library'});
        $("span.selectable").tooltip({placement:'bottom',container:'#library'});

        fixLibrarySize();
        $(window,document).on('resize',function() {
          fixLibrarySize();
        });

      });
      function fixLibrarySize() {
        var b = $("#main-body"),
          h = parseFloat(b.css('height'));
          val = parseInt((h-100)/2);

        if( val < 350 )
          val = 350;
        $(".cardListWrapper, .cardListTableWrapperTable, .tableResultsWrapper").css('height', val+"px" );

        var tdH = parseFloat($(".tableResultsWrapper").css('height'));
        $(".imgPreviewWrapper:first").css('height', val-30+"px");
      }
    }
  }
});
