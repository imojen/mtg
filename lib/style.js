var leftMenuStatut = 0,
	leftMenuSize = 150,
	heightMin = 740,
	widthMin = 990,
	mainAnimationDuration = 500;


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
function bindLeftMenuTriggers() {
	var $ul = $("#leftMenu ul"),
		$on = $("#body_onglets ul"),
		$bw = $("#bodyContentWrapper");
	$ul.find('li').unbind('click').click(function() {
		var id = $(this).attr('id');
		if( $on.find('li.'+id).length == 1 ) {
			// TODO : simuler le click sur l'onglet déjà existant
			// TODO : vérifier que ce n'est pas déjà l'onglet courant actif
		}
		else {
			$bw.find('page.page_visible').removeClass('page_visible').hide(); // Masquer la page active courante
			$on.find('li.selected').removeClass('selected'); // Enlever le select de l'onglet actif
			var libelle = $(this).find('span').text();
			$on.append('<li class="'+id+' selected"><span>'+libelle+'</span></li>');
			$on.find('li.selected').animate({'margin-top':0},mainAnimationDuration,function() {
				// Todo afficher la page de l'onglet demandé
				$bw.append('<page id="page_'+id+'" class="page_visible"><div class="bodyContent"><br/><br/><br/><center>Contenu de la page '+libelle+'... </center></div></page>');
				$bw.find('page.page_visible .bodyContent').show().css('height', $bw.height() );

			});
		}
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
		$("#body_onglets li:first").addClass('selected').animate({'margin-top':0},mainAnimationDuration,function() {
			bodyContent_apparition();
		});
	});
}
function bodyWrapper_bodyContentSizeFix() {
	var $bc = $("#bodyContentWrapper"),
		$b = $("#bodyWrapper");
	$bc.css('height', parseInt($b.css('height'),10) - 50 );
}
function bodyContent_apparition() {
	var $bc = $(".bodyContent"),
		$bcw = $("#bodyContentWrapper");
	$bc.show().animate({'height': $bcw.height() }, mainAnimationDuration, function() {
		bindLeftMenuTriggers(); // Activer le menu de droite
		// Contnu de la page Home
	});
}