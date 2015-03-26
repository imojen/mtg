var mysql      = require('mysql');
var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var elasticsearch = require('elasticsearch');


/** Mysql **/
var mysqlHost = 'localhost',
    mysqlUser = 'mtg',
    mysqlPass = 'lolilol';
var connection = mysql.createConnection({
  host     : mysqlHost,
  user     : mysqlUser,
  password : mysqlPass
}); 
connection.connect();   


/* ES */
var client = new elasticsearch.Client({
  host: 'localhost:9200/mtgcard',
  log: 'trace'
});

router.post('/', function(req, res) {
	res.write('{}');	  	
	res.end();
});


router.post('/search', function(req, res) {
	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var str = nodeDatas.str;

	// Elastic search
	client.search({
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
		res.write('{"resulsts" : [] }');
		res.end();	 
	}, function (error) {
		console.trace(error.message);
		res.write('{"resulsts" : [] }');
		res.end();	  
	});


});






module.exports = router;	