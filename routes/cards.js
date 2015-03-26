var mysql      = require('mysql');
var express = require('express');
var querystring = require('querystring');
var http = require('http');
var router = express.Router();


/** Mysql **/
//TODO REMOVE LOCALHOST !!!
var mysqlHost = 'localhost',
    mysqlUser = 'mtg',
    mysqlPass = 'lolilol';
var connection = mysql.createConnection({
  host     : mysqlHost,
  user     : mysqlUser,
  password : mysqlPass
}); 
connection.connect();   


/** Http **/

router.post('/', function(req, res) {
	res.write('{}');	  	
	res.end();
});


router.post('/search', function(req, res) {
	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var str = nodeDatas.str;
	var ids = new Array();
	var max = 0;
	

	// Elastic search

	var qES = {query: {bool: {must: [{term: {'mtgcard.name': str.toLowerCase()}}]}},size : 20};

	var qESstring = JSON.stringify(qES);
	//var qESstring = qES;

	var headers = {
	  'Content-Type': 'application/json',
	  'Content-Length': qESstring.length
	};
//TODO REMOVE LOCALHOST !!!
	var options = {
	  host: 'localhost',
	  port: 9200,
	  path: '/mtgcard/_search',
	  method: 'POST',
	  headers: headers
	};

	var req = http.request(options, function(response) {
		response.setEncoding('utf-8');

		var responseString = '';

		response.on('data', function(datas) {
			responseString += datas;
			var d = JSON.parse(datas);	
			var hits = d.hits.hits;
			max = d.hits.total;
			for( var i in hits ) 
				ids.push(hits[i]["_id"]);			
		});


		req.on('error', function(e) {
			// TODO: handle error.
		});

		response.on('end', function() {
			
		var q = "SELECT *  FROM mtg.mtgcard WHERE id IN ("+ids.join(",")+") ORDER BY name";

		connection.query(q, 
			function(err, rows, fields) {
				if( rows ) {
					var lines = new Array();
					for( var i = 0 ; i < rows.length; i++ ) {

						var type =  ( rows[i]['supertypes'] != null ? rows[i]['supertypes']+" " : "" );
							type += ( rows[i]['types']      != null ? rows[i]['types']+" "      : "");
							type += ( rows[i]['subtypes']   != null ? rows[i]['subtypes']       : "");

						var pt = ( rows[i]['power'] != null && rows[i]['toughness'] != null ? rows[i]['power']+'/'+rows[i]['toughness'] : '' );

						var str = '{ "id" : '+rows[i]['id']+', "mid" : '+rows[i]['multiverseid']+', "name" : "'+rows[i]['name']+'", "mana" : "'+rows[i]['manaCost']+'",';
						str += ' "pt" : "'+pt+'", "type": "'+type+'" }';
						lines.push(str);
					}
					res.write('{"results" : ['+lines.join(",")+'], "total": '+max+' }');
					res.end();
				}					
				else {
					res.write('{"results" : [], "total": '+max+' }');
					res.end();					
				}
			}
		);



			
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






module.exports = router;	