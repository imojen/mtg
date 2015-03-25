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
		 "body": {
		    "query": {
		      "filtered": {
		        "query": {
		          "match": {
		            "name": str		
		        }}}}}
	}).then(function (body) {
		var hits = body.hits.hits;
		//res.write('{"resulsts" : '+encodeURIComponent(hits)+' }');	  	
		//res.end();	  
	}, function (error) {
	  console.trace(error.message);
	});

	/*connection.query("SELECT id,multiverseid, name, manaCost, power, thoughness, superTypes, types, subtypes  FROM mtg.mtgcard WHERE id IN ()", 
		function(err, rows, fields) {
	  
		});
	}*/

	res.write('{"resulsts" : [] }');	  	
	res.end();

});

module.exports = router;	