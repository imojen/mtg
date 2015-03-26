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
	$scope.stringSearch = "";
	$scope.timeOut = null;


	$scope.cardSelect = function( id, multiversId ) {
		$scope.cardSlected = id;
		if( multiversId != null )
			$scope.previewUrl = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiversId+'&type=card';
		else
			$scope.previewUrl = 'images/default.jpg';
		//$scope.previewUrl = 'http://api.mtgdb.info/content/card_images/'+multiversId+'.jpeg';
	}

	$scope.getManaCost = function( str ) {
		str = str.replace(/}{/gi," ");
		str = str.replace(/{/gi,"");
		str = str.replace(/}/gi,"");
		var tmp = str.split(" ");
		var txt = "";
		for( var i = 0; i < tmp.length; i++ ) 
			txt+= '<span class="symbol symbol_'+tmp[i]+'"></span>';		
		return txt;
	}

	
	$scope.searchCard = function( event ) {
		clearTimeout($scope.timeOut);
		$scope.results = [];
		if( $scope.stringSearch.length < 3 )
			return;
		$scope.timeOut = setTimeout(function() {
			$scope.httpSearch();
		},50);
	}

	$scope.httpSearch = function() {
		var method = 'POST';
		var inserturl = 'http://localhost:1337/cards/search';
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
			$scope.results = response.results;
			$scope.total = response.total;
			
		}).
		error(function(response) {
	        $scope.codeStatus = response || "Request failed";
			alert($scope.codeStatus);
			return false;
		});						
	}



}



mtgApp.controller( controllers );