var controllers = {};


controllers.topMenuCtrl = function( $scope, $http ) {

	$scope.topMenuAction = function( page ) {
		if( page == $scope.page )
			return;
		$scope.page = page;
	}

}

controllers.homeCtrl = function( $scope, $http ) {


}

controllers.libraryCtrl = function( $scope, $http, notification ) {

	/*$scope.results = [
		{ "id" : 18794, "mid" : 193452, "name" : "Emrakul, the Aeons Torn", "mana" : '15', "pt" : '15/15', "type": 'Legendary Creature - Eldrazi'},
		{ "id" : 18793, "mid" : 193485, "name" : "Emrakul's Hatcher", "mana" : '4 R', "pt" : '3/3', "type" : 'Creature - Eldrazi, Drone'},
	];*/
	$scope.results = [];
	$scope.total = 0;

	$scope.cardSlected = null;
	$scope.cardId = null;
	$scope.cardMultiverseId = null;
	$scope.previewUrl = 'images/default.jpg';
	$scope.linkToImg = '#';
	$scope.stringSearch = "";
	$scope.timeOut = null;


	// Create / open / edit deck
	$scope.popup = false;
	$scope.creatingNewDeck = false;
	$scope.openingDeck = false;
	$scope.editDeck = false;
	$scope.newDeck = { deckname : '', comment : ''};
	$scope.decks = [];

	// Deck
	$scope.deck_set = false;
	$scope.deck_id = null;
	$scope.deck_name = "";
	$scope.deck_comment = "";
	$scope.edit_deck_name = "";
	$scope.edit_deck_comment = "";


	// Popup
	$scope.closePopup = function() {
		$scope.popup = false;
		$scope.creatingNewDeck = false;
		$scope.openingDeck = false;
		$scope.editDeck = false;
	}
	$scope.$watch( "popup", function( bool ) {
		if( bool ) 
			setTimeout(function() { $scope.resizePopup(); },5);
	});
	$scope.resizePopup = function() {
		var $box = $(".popup-wrapper:visible");
		$box.css({
			'margin-left' : - parseFloat($box.css('width')) / 2 +"px",
			'margin-top' : - parseFloat($box.css('height')) / 2 +"px",
		});		
	}


	angular.element(document).ready(function () {
		if( $(".wrapperScroll").length ) {
			$(".wrapperScroll").on('scroll',function() {
				$(".scrollItem").css('top',$(this).scrollTop());
			});
		}
		$(".navbar-btn, .title").tooltip({placement:'top',container:'#library'});
	});

	$scope.showAlert = function(str) {
		notification.showAlert(str);
	};

	$scope.cardSelect = function( id, multiversId ) {
		$scope.cardSlected = id;
		$scope.previewUrl = 'images/default.jpg';
		$scope.linkToImg = '#';		
		if( multiversId != null ) {
			$scope.previewUrl = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiversId+'&type=card';
			$scope.linkToImg = 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid='+multiversId;
		}
		//$scope.previewUrl = 'http://api.mtgdb.info/content/card_images/'+multiversId+'.jpeg';
	}

	$scope.getManaCost = function( str ) {
		str = str.replace(/}{/gi," ");
		str = str.replace(/{/gi,"");
		str = str.replace(/}/gi,"");
		str = str.replace(/\//gi,"");
		var tmp = str.split(" ");
		var txt = "";
		for( var i = 0; i < tmp.length; i++ ) 
			txt+= '<span class="symbol symbol_'+tmp[i]+'"></span>';		
		return txt;
	}

	
	$scope.searchCard = function( event ) {
		clearTimeout($scope.timeOut);
		$scope.results = [];
		if( $scope.stringSearch.length < 2 )
			return;
		$scope.timeOut = setTimeout(function() {
			$scope.httpSearch();
		},500);
	}

	$scope.httpSearch = function() {
		if( $scope.stringSearch.length < 2 )
			return false;
		var method = 'POST';
		//TODO REMOVE LOCALHOST !!!
		var inserturl = './cards/search';
		var nodeDatas = {
		      'str' : $scope.stringSearch,
		    };

		$http({
		    method: method,
		    url: inserturl,
		    data:  'nodeDatas='+JSON.stringify(nodeDatas),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).
		success(function(response) {
			$scope.results =  response.results;
			$scope.total = response.total;
			
		}).
		error(function(response) {
	        $scope.codeStatus = response || "Request failed";
			alert($scope.codeStatus);
			return false;
		});						
	}

	$scope.decode = function( str ) {
		return decodeURIComponent(str);
	}
	$scope.decodeDeckName = function( str ) {
		return '<span class="glyphicon glyphicon-book"></span> '+decodeURIComponent(str);
	}
	$scope.decodeDeckComment = function( str ) {
		return '<span class="comment-text">'+decodeURIComponent(str)+'</span>';
	}


	$scope.newDeck = function() {
		if( $scope.popup || $scope.creatingNewDeck )
			return;
		$scope.popup = true;
		$scope.creatingNewDeck = true;
		$scope.newDeck.deckname = '';
		$scope.newDeck.comment = '';
		setTimeout(function(){$("#deckName").focus();},50);
	}
	$scope.quitCreatingDeck = function() {
		$scope.closePopup();
	}
	$scope.newDeckCreation = function() {
		if( $scope.newDeck.deckname.length < 4 ) {
			notification.showAlert("Deck name must contain at least 4 characters.");
			return false;
		}
		if( $scope.newDeck.deckname.length > 60 ) {
			notification.showAlert("Deck name must contain maximum  60 characters.");
			return false;
		}
		if( $scope.newDeck.comment.length > 300 ) {
			notification.showAlert("Deck comment must contain maximum  300 characters.");
			return false;
		}
		var method = 'POST';
		var inserturl = './cards/createDeck';
		var nodeDatas = {
		      'deckName' : encodeURIComponent($scope.newDeck.deckname),
		      'deckComment' : encodeURIComponent($scope.newDeck.comment),
		   };
		$http({
		    method: method,
		    url: inserturl,
		    data:  'nodeDatas='+JSON.stringify(nodeDatas),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).
		success(function(response) {
			if(response.success) {
				$scope.deck_set = true;
				$scope.deck_id = response.idDeck;
				$scope.deck_name = response.deckName;
				$scope.deck_comment = response.comment;
				$scope.closePopup();
			}
			else {
				notification.showAlert(response.errMsg);
				return false;
			}			
		}).
		error(function(response) {
	        $scope.codeStatus = response || "Request failed";
			alert($scope.codeStatus);
			return false;
		});	

	}
	$scope.quitOpeningDeck = function() {
		$scope.closePopup();	
	}
	$scope.openDeck = function() {
		if( $scope.popup || $scope.openingDeck )
			return;		
		var method = 'POST';
		var inserturl = './cards/openDeck';
		$http({
		    method: method,
		    url: inserturl,
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).
		success(function(response) {
			if(response.success) {
				if( response.nb == 0 ) {
					notification.showAlert("You should create a deck at first !");
					return;
				}
				$scope.decks = response.decks;
				$scope.popup = true;
				$scope.openingDeck = true;	
				return;
			}
			else {
				notification.showAlert(response.errMsg);
				return false;
			}			
		}).
		error(function(response) {
	        $scope.codeStatus = response || "Request failed";
			alert($scope.codeStatus);
			return false;
		});	
	}
	$scope.setDeck = function( id_deck ) {
		for( var i in $scope.decks ) {
			if( $scope.decks[i]['id'] == id_deck ) {
				$scope.deck_set = true;
				$scope.deck_id = id_deck;
				$scope.deck_name = $scope.decks[i]['name'];
				$scope.deck_comment = $scope.decks[i]['comment'];	
				$scope.quitOpeningDeck();			
			}
		}
		if( !$scope.deck_set ) {
			notification.showAlert("An error has occurred while opening this deck...");
			return;
		}
	}
	$scope.unsetDeck = function() {
		$scope.deck_set = false;
		$scope.deck_id = null;
		$scope.deck_name = '';
		$scope.deck_comment = '';		
	}
	$scope.deleteDeck = function() {
		if( !confirm("Are you sure ?") )
			return;
		var method = 'POST';
		var inserturl = './cards/deleteDeck';
		var nodeDatas = {
		      'deckId' : $scope.deck_id,
		   };
		$http({
		    method: method,
		    url: inserturl,
		    data:  'nodeDatas='+JSON.stringify(nodeDatas),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).
		success(function(response) {
			if(response.success) {
				notification.showAlert("This deck has been removed from your library.");
				$scope.unsetDeck();
				$scope.closePopup();
				return;
			}
			else {
				notification.showAlert(response.errMsg);
				return false;
			}			
		}).
		error(function(response) {
	        $scope.codeStatus = response || "Request failed";
			alert($scope.codeStatus);
			return false;
		});			
	}


	$scope.editThisDeck = function() {
		if( $scope.popup || $scope.editDeck || !$scope.deck_set  )
			return;
		$scope.popup = true;
		$scope.editDeck = true;
		$scope.edit_deck_name = $scope.decode($scope.deck_name);
		$scope.edit_deck_comment = $scope.decode($scope.deck_comment);
	}

	$scope.endEditingDeck = function() {
		if( $scope.edit_deck_name.length < 4 ) {
			notification.showAlert("Deck name must contain at least 4 characters.");
			return false;
		}
		if( $scope.edit_deck_name.length > 60 ) {
			notification.showAlert("Deck name must contain maximum  60 characters.");
			return false;
		}
		if( $scope.edit_deck_comment.length > 300 ) {
			notification.showAlert("Deck comment must contain maximum  300 characters.");
			return false;
		}
		var method = 'POST';
		var inserturl = './cards/editDeck';
		var nodeDatas = {
		      'deckName' : encodeURIComponent($scope.edit_deck_name),
		      'deckComment' : encodeURIComponent($scope.edit_deck_comment),
		      'deckId' : $scope.deck_id,
		   };
		$http({
		    method: method,
		    url: inserturl,
		    data:  'nodeDatas='+JSON.stringify(nodeDatas),
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		}).
		success(function(response) {
			if(response.success) {
				$scope.deck_name = encodeURIComponent($scope.edit_deck_name);
				$scope.deck_comment = encodeURIComponent($scope.edit_deck_comment);
				$scope.closePopup();
				return;
			}
			else {
				notification.showAlert(response.errMsg);
				return false;
			}			
		}).
		error(function(response) {
	        $scope.codeStatus = response || "Request failed";
			alert($scope.codeStatus);
			return false;
		});			
	}





}



mtgApp.controller( controllers );