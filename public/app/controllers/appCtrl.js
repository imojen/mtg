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

controllers.libraryCtrl = function( $scope, $http ) {

	$scope.results = [
		{ "id" : 18794, "mid" : 193452, "name" : "Emrakul, the Aeons Torn", "mana" : '15', "pt" : '15/15', "type": 'Legendary Creature - Eldrazi'},
		{ "id" : 18793, "mid" : 193485, "name" : "Emrakul's Hatcher", "mana" : '4 R', "pt" : '3/3', "type" : 'Creature - Eldrazi, Drone'},
	];

	$scope.cardSlected = null;
	$scope.cardId = null;
	$scope.cardMultiverseId = null;
	$scope.previewUrl = 'images/default.jpg';
	$scope.cardSelect = function( id, multiversId ) {
		$scope.cardSlected = id;
		//$scope.previewUrl = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiversId+'&type=card';
		$scope.previewUrl = 'http://api.mtgdb.info/content/card_images/'+multiversId+'.jpeg';
	}

	$scope.getManaCost = function( str ) {
		var tmp = str.split(" ");
		var txt = "";
		for( var i = 0; i < tmp.length; i++ ) 
			txt+= '<span class="symbol symbol_'+tmp[i]+'"></span>';		
		return txt;
	}




}



mtgApp.controller( controllers );