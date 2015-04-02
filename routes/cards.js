var express = require('express');
var querystring = require('querystring');
var http = require('http');
var router = express.Router();
var config = require("../conf/config");
var sqlDao = require("./dao/sqlDao");
es = config.elastic;


/** Http **/

router.post('/', function(req, res) {
	res.write('{}');	  	
	res.end();
});

/** Search card **/
router.post('/search', function(req, res) {

	try {
		JSON.parse(req.body.nodeDatas);
	}
	catch (err) {
		res.write('{"success" : false, "errMsg" : "Try again using less special chars..." }');	  	
		res.end();	
		return;			
	}
	

	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var ids = new Array();
	var facetTypes = new Array();
	var facetSubTypes = new Array();
	var facetSuperTypes = new Array();
	var facetColors = new Array();
	var max = 0;
	
	
	var str = nodeDatas.str;
	str = str.toLowerCase();
	str += "*";


	// Elastic search
	var qES = { fields : ["_id"], query: {bool: {must: [{query_string: {default_field: "mtgcard.name",query: str}}]}},size : 30,
			  "sort": [
			           "_score",
			           "mtgcard.name"
			         ],
			  "aggs": {
				    "types": {
				      "terms": {
				        "field": "types"
				      }
				    },
				    "supertypes": {
				      "terms": {
				        "field": "supertypes"
				      }
				    },
				    "subtypes": {
				      "terms": {
				        "field": "subtypes"
				      }
				    },
				    "colors": {
					      "terms": {
					        "field": "colors"
					      }
					}
				  }};

	
	var qESstring = JSON.stringify(qES);
//	console.log(qESstring);
	//var qESstring = qES;

	var headers = {
	  'Content-Type': 'application/json',
	  'Content-Length': qESstring.length
	};
//TODO REMOVE LOCALHOST !!!
	var options = {
	  host: es.host,
	  port: es.port,
	  path: '/mtgcard/_search?',
	  method: 'POST',
	  headers: headers
	};

	var req = http.request(options, function(response) {
		response.setEncoding('utf-8');

		var responseString = '';

		response.on('data', function(datas) {
			
				responseString += datas;
//			 console.log(datas); // elastic return		
			
		});

		req.on('error', function(e) {
			// TODO: handle error.
		});

		
		


		response.on('end', function() {
			
			var d = JSON.parse(responseString);
			var hits = d.hits.hits;
			var agg = d.aggregations;
			max = d.hits.total;
			for( var i in hits ){
				ids.push(hits[i]["_id"]);
			}
			
			var buckets = agg.subtypes.buckets;
			for( var i in agg.subtypes.buckets ){
				var valPush={ };
				valPush.key=buckets[i]["key"];
				valPush.count=buckets[i]["doc_count"];				
				facetSubTypes.push(valPush);
			}
			
			var buckets = agg.supertypes.buckets;
			for( var i in agg.supertypes.buckets ){
				var valPush={ };
				valPush.key=buckets[i]["key"];
				valPush.count=buckets[i]["doc_count"];				
				facetSuperTypes.push(valPush);
			}
			
			var buckets = agg.types.buckets;
			for( var i in agg.types.buckets ){
				var valPush={ };
				valPush.key=buckets[i]["key"];
				valPush.count=buckets[i]["doc_count"];				
				facetTypes.push(valPush);
			}
			
			var buckets = agg.colors.buckets;
			for( var i in agg.colors.buckets ){
				var valPush={ };
				valPush.key=buckets[i]["key"];
				valPush.count=buckets[i]["doc_count"];				
				facetColors.push(valPush);
			}
			
			
			if( ids.length == 0 ) {
				res.write('{"results" : [], "total": 0 }');
				res.end();	
				return;
			}		
			var q = "SELECT *,a.id AS 'idcard',a.name AS 'card', b.name AS 'edition'  FROM mtg.mtgcard a LEFT JOIN mtg.mtgedition b ON a.editionId = b.id WHERE a.id IN ("+ids.join(",")+") AND a.multiverseid IS NOT NULL ORDER BY FIELD(a.id,"+ids.join(",")+")";
			sqlDao.sqlQuery(q, function (rows) {
				if( rows ) {
				var lines = new Array();
				for( var i = 0 ; i < rows.length; i++ ) {

					var type =  ( rows[i]['supertypes'] != null ? rows[i]['supertypes']+" " : "" );
						type += ( rows[i]['types']      != null ? rows[i]['types']+" "      : "");
						type += ( rows[i]['subtypes']   != null ? rows[i]['subtypes']       : "");

					var pt = ( rows[i]['power'] != null && rows[i]['toughness'] != null ? rows[i]['power']+'/'+rows[i]['toughness'] : '' );
					var loyalty = (rows[i]['loyalty'] != null ? rows[i]['loyalty'] : "" );

					var str = '{ "id" : '+rows[i]['idcard']+', "mid" : '+rows[i]['multiverseid']+', "name" : "'+encodeURIComponent(rows[i]['card'])+'", "mana" : "'+rows[i]['manaCost']+'",';
					str += ' "pt" : "'+pt+'", "type": "'+type+'", "loyalty" : "'+loyalty+'", "edition" : "'+encodeURIComponent(rows[i]['edition'])+'" }';
					lines.push(str);
				}
				res.write('{"results" : ['+lines.join(",")+'], "total": '+max+', "facet":{"subtypes": ' + JSON.stringify(facetSubTypes) +',"supertypes":' + JSON.stringify(facetSuperTypes) +',"types":' + JSON.stringify(facetTypes) +',"colors":' + JSON.stringify(facetColors) +'}}');
				res.end();
			}					
			else {
				res.write('{"results" : [], "total": '+max+' }');
				res.end();					
			}});
		});
	});

	req.write(qESstring);
	req.end();

	/*client.search({
		method : 'POST',
		index: 'mtgcard',
		body: {
			query: {
				"bool": {
					"must": [
								{
									"term": {
										"mtgcard.name": str
									}
								}
					],
				}
			}
		}
	}).then(function (body) {
		var hits = body.hits.hits;
		/*if( body.hits.total == 0 ) {
			res.write('{"resulsts" : [] }');
			res.end();
		}*/
		/*var resulsts = [];
		var ids = new Array();
		for( var i in hits ) 
			ids.push(hits[i]["_id"]);

		console.log(ids);*/

		/*var q = "SELECT id,multiverseid, name, manaCost, power, thoughness, superTypes, types, subtypes  FROM mtg.mtgcard WHERE id IN ("+ids.join(",")+")";
		console.log( "QUERY : " + q);
		connection.query(q, function(err, rows, fields) {
				console.log("ROWS");
	  			console.log(rows);
			}
		);*/

		

		/*res.write('{"resulsts" : '+JSON.stringify(resulsts)+' }');	  	*/
		/*res.write('{"resulsts" : [] }');
		res.end();	 */
});












/** Create Deck **/
router.post('/createDeck', function(req, res) {
	
	try {
		JSON.parse(req.body.nodeDatas);
	}
	catch (err) {
		res.write('{"success" : false, "errMsg" : "Try again using less special chars..." }');	  	
		res.end();	
		return;			
	}

	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var name = nodeDatas.deckName;
	var comment = nodeDatas.deckComment;

	if( name.length < 4 || name.length > 60 ) {
		res.write('{"success" : false, "errMsg" : "Invalid deck name length." }');	  	
		res.end();
	}
	if( comment.length > 300 ) {
		res.write('{"success" : false, "errMsg" : "Invalid deck comment length." }');	  	
		res.end();
	}
	
	connection.query("SELECT * FROM mtg.mtgdeck WHERE id_mtgusers = ? AND deleted = 0", [req.session.id_user], function(err, rows, fields) {
		if( rows.length > 50 ) {
			res.write('{"success" : false, "errMsg" : "You have already created 50 decks. WTF is wrong with you ?" }');	  	
			res.end();	
			return;		
		}
	});
	
	connection.query("INSERT INTO mtg.mtgdeck SET ?", { 'id_mtgusers' : req.session.id_user, 'name' : name, 'comment' : comment}, function(err, result) {
		if( err ) {
			console.log(err);
			res.write('{"success" : false, "errMsg" : "Unable to create deck..." }');	  	
			res.end();			
			return;
		}
		else {
			var idDeck = result.insertId;
			res.write('{"success" : true, "idDeck" : '+idDeck+', "deckName" : "'+name+'", "comment" : "'+comment+'" }');
			res.end();		
			return;
		}
	});
});

/** Open deck **/
router.post('/openDeck',function( req, res ) {
	connection.query("SELECT * FROM mtg.mtgdeck WHERE id_mtgusers = ? AND deleted = 0", [req.session.id_user], function(err, rows, fields) {
		if( err ) {
			res.write('{"success" : false, "errMsg" : "An error has occurred." }');	
			res.end();	
			return;		
		}
		if( rows.length == 0 ) {
			res.write('{"success" : true, "nb" : 0 }');	  	
			res.end();	
			return;		
		}
		var decks = new Array();
		for( var i = 0; i < rows.length; i++ ) {
			decks.push('{ "id" : '+rows[i]['id']+' , "name" : "'+encodeURIComponent(rows[i]['name'])+'", "comment" : "'+encodeURIComponent(rows[i]['comment'])+'" }');
		}
		res.write('{"success" : true, "nb" : '+rows.length+', "decks" : ['+decks.join(',')+'] }');	
		res.end();  	
		return;	
	});	
});

/** Delete deck **/
router.post('/deleteDeck',function( req,res) {
	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var id = nodeDatas.deckId;	
	connection.query("SELECT * FROM mtg.mtgdeck WHERE id_mtgusers = ? AND id = ? AND deleted = 0", [req.session.id_user, id], function(err, rows, fields) {
		if( err || rows.length != 1 ) {
			res.write('{"success" : false, "errMsg" : "An error has occurred." }');	
			res.end();	
			return;				
		}
		connection.query('UPDATE mtg.mtgdeck SET deleted = 1 WHERE id = ? ',[id], function (err, result) {
			res.write('{"success" : true}');	
			res.end();	
			return;				
		});
	});
});

/** Obtenir un deck **/
router.post('/getDeck',function( req,res) {
	try {
		JSON.parse(req.body.nodeDatas);
	}
	catch (err) {
		res.write('{"success" : false, "errMsg" : "Try again using less special chars..." }');	  	
		res.end();	
		return;			
	}	
	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var id_deck = parseInt(nodeDatas.deckId,10);
	// Return deck
	var deck = new Array();
	var query = "SELECT *,a.id AS 'idcard', a.name AS 'card', b.name AS 'edition'  FROM mtg.mtgcard a ";
		query+=" LEFT JOIN mtg.mtgedition b ON a.editionId = b.id";
		query+=" LEFT JOIN mtg.mtgcardsdeck d ON a.multiverseid = d.mtgcard_multiverseid";
		query+=" WHERE d.mtgdeck_id  = "+id_deck+" ";
	connection.query(query, function(err, rows, fields) {
		for( var i in rows ) {
			var type =  ( rows[i]['supertypes'] != null ? rows[i]['supertypes']+" " : "" );
				type += ( rows[i]['types']      != null ? rows[i]['types']+" "      : "");
				type += ( rows[i]['subtypes']   != null ? rows[i]['subtypes']       : "");

			var pt = ( rows[i]['power'] != null && rows[i]['toughness'] != null ? rows[i]['power']+'/'+rows[i]['toughness'] : '' );
			var loyalty = (rows[i]['loyalty'] != null ? rows[i]['loyalty'] : "" );

			var str = '{ "id" : '+rows[i]['idcard']+', "mid" : '+rows[i]['multiverseid']+', "name" : "'+encodeURIComponent(rows[i]['card'])+'", "mana" : "'+rows[i]['manaCost']+'",';
			str += ' "pt" : "'+pt+'", "type": "'+type+'", "loyalty" : "'+loyalty+'", "edition" : "'+encodeURIComponent(rows[i]['edition'])+'", ';
			str += ' "quantity_deck" : '+rows[i]['quantity_deck']+', "quantity_side" : '+rows[i]['quantity_side']+', "quantity_vault" : '+rows[i]['quantity_vault']+' }';

			deck.push(str);
		}
		res.write('{"success" : true, "currentDeck" : ['+deck.join(",")+'] }');	  	
		res.end();	
		return;	
	});
});



/** Edit deck **/
router.post('/editDeck',function( req,res) {

	try {
		JSON.parse(req.body.nodeDatas);
	}
	catch (err) {
		res.write('{"success" : false, "errMsg" : "Try again using less special chars..." }');	  	
		res.end();	
		return;			
	}

	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var id = nodeDatas.deckId;	
	var name = nodeDatas.deckName;
	var comment = nodeDatas.deckComment;

	connection.query("SELECT * FROM mtg.mtgdeck WHERE id_mtgusers = ? AND id = ? AND deleted = 0", [req.session.id_user, id], function(err, rows, fields) {
		if( err || rows.length != 1 ) {
			res.write('{"success" : false, "errMsg" : "An error has occurred." }');	
			res.end();	
			return;				
		}
		connection.query('UPDATE mtg.mtgdeck SET name = ?, comment = ? WHERE id = '+id,[name,comment], function (err, result) {
			if( err ) {
				res.write('{"success" : false, "errMsg" : "An error has occurred while updating your deck." }');	
				console.log(err);
				res.end();	
				return;						
			}
			res.write('{"success" : true}');	
			res.end();	
			return;				
		});
	});
});




/** Add a card to deck **/
router.post('/addCard',function( req,res) {

	try {
		JSON.parse(req.body.nodeDatas);
	}
	catch (err) {
		res.write('{"success" : false, "errMsg" : "Try again using less special chars..." }');	  	
		res.end();	
		return;			
	}

	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var type = nodeDatas.typeAction;
	var id_deck = parseInt(nodeDatas.deckId,10);	
	var id_card = parseInt(nodeDatas.cardMultiverseId,10);
	var where = nodeDatas.where;

	if( where != "quantity_deck" && where != "quantity_side" && where != "quantity_vault") {
		res.write('{"success" : false, "errMsg" : "An error has occured... # Where" }');	  	
		res.end();	
		return;			
	}

	connection.query("SELECT * FROM mtg.mtgdeck WHERE id_mtgusers = ? AND id = ? AND deleted = 0", [req.session.id_user, id_deck], function(err, rows, fields) {
		if( rows.length != 1 ) {
			res.write('{"success" : false, "errMsg" : "An error has occured... # Owner" }');	  	
			res.end();	
			return;	
		}
		else {
			connection.query("SELECT * FROM mtg.mtgcardsdeck WHERE mtgdeck_id = ? AND mtgcard_multiverseid = ? ", [id_deck, id_card], function(err, rows, fields) {
				if( err ) {
					console.log(err);
				}
				if( rows.length > 0 ) {
					connection.query('UPDATE mtg.mtgcardsdeck SET '+where+' = ( '+where+' + 1 ) WHERE mtgdeck_id = ? AND mtgcard_multiverseid = ? ', [id_deck, id_card], function (err, result) {
						if( err ) {
							res.write('{"success" : false, "errMsg" : "An error has occured... # Update" }');	  	
							res.end();	
							return;							
						}
						res.write('{"success" : true }');	  	
						res.end();	
						return;						
					});
				}
				else {
					var insert = { 'mtgdeck_id' : id_deck, 'mtgcard_multiverseid' : id_card };
					insert[where] = 1;					
					connection.query("INSERT INTO mtg.mtgcardsdeck SET ?", insert, function(err, result) {
						if( err ) {
							console.log(err);
							res.write('{"success" : false, "errMsg" : "An error has occured... # Insert" }');	  	
							res.end();	
							return;							
						}	
						res.write('{"success" : true }');	  	
						res.end();	
						return;	
					});			
				}
			});	
		}
	});
});










module.exports = router;	