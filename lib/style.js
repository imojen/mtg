var leftMenuStatut = 0,
	leftMenuSize = 150,
	heightMin = 740,
	widthMin = 990,
	mainAnimationDuration = 100;


$(document).ready(function() {

	windowResize();

	leftMenu_HeigtFix();
	leftMenu_apparition();

	bodyWrapper_sizeFix();

});

function windowResize() {
	$( window ).on('resize',function() {
		leftMenu_HeigtFix();
		bodyWrapper_sizeFix();
	});
}


// Left menu functions
function leftMenu_HeigtFix() {
	var $m = $("#leftMenu"),
		 h = parseInt( $( window ).height() ,10);
	if( h < heightMin ) h = heightMin;
	$m.find('li').each(function() {
		$(this).css('height', h/6 );
	});
}
function leftMenu_apparition() {
	if(leftMenuStatut) return;
	var $m = $("#leftMenu");
	$m.find('li').addClass('hidden');
	if( leftMenu_apparitionAnimate() ) {
		alert(1);
		leftMenuStatut = true;
		bodyOnglets_apparition();
	}
}
function leftMenu_apparitionAnimate() {
	var $m = $("#leftMenu");
	if( $m.find('li.hidden').length == 0 ) {
		bodyOnglets_apparition();
		return;
	}
	var item = $m.find('li.hidden:first');
	item.removeClass('hidden');
	setTimeout('leftMenu_apparitionAnimate()', mainAnimationDuration/2 );
	item.animate({'margin-left' : 0,'opacity':1}, mainAnimationDuration, "easeOutCubic",function() {
		$(this).removeClass('hidden');
	});
}


// Body functions
function bodyWrapper_sizeFix() {
	var $b = $("#bodyWrapper"),
		bw = parseInt( $( window ).width() ,10) - leftMenuSize ; // 150px menu 
	if( bw < widthMin - leftMenuSize  ) bw = widthMin - leftMenuSize;
	$b.css('width', bw);
	bodyWrapper_bodyContentSizeFix();
}
function bodyOnglets_apparition() {
	$("#body_onglets").show('slide',mainAnimationDuration,function() {
		$("#body_onglets li:first").addClass('selected').animate({'margin-top':0},mainAnimationDuration);
	});
}
function bodyWrapper_bodyContentSizeFix() {
	var $bc = $("#bodyContentWrapper"),
		$b = $("#bodyWrapper");
	$bc.css('height', parseInt($b.css('height'),10) - 50 );
}