var mysql      = require('mysql');
var express = require('express');
var router = express.Router();


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


/* Login **/
router.post('/', function(req, res) {
	// Tests...
	var nodeDatas = JSON.parse(req.body.nodeDatas);
	var login = nodeDatas.login;
	var pass = nodeDatas.pass;

	connection.query("SELECT * FROM mtg.mtgusers WHERE login = ? AND pass = ? ", [login, pass] , function(err, rows, fields) {
	  if (err) {
		res.write('{"success" : false, "errMsg" : "Database Error [login : Q1]" }');	  	
		res.end();
	  }
	  else if( rows.length == 0 ) {
		res.write('{"success" : false }');	  	
		res.end();
	  }
	  else {
	  	// Mise en sessions # TODO

	  	// Réponse
		res.write('{"success" : true }');	  	
		res.end();
	  }
	});


});



/* Signup **/
router.post('/signup', function(req, res) {

	var nodeDatas = JSON.parse(req.body.nodeDatas);

	var regExpValidEmail = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$", "gi");
	if ( !nodeDatas.mail.match(regExpValidEmail) ) {
		res.write('{"success" : false, "errMsg" : "Please enter a valid mail adress." }');	  	  	
		res.end();
	}
	
	connection.query("SELECT * FROM mtg.mtgusers WHERE login = ? ", [nodeDatas.login], function(err, rows, fields) {
	  if (err) {
		res.write('{"success" : false, "errMsg" : "Database Error [login/signup : Q1]" }');	  	
		res.end();
	  }
	  else if( rows.length > 0 ) {
		res.write('{"success" : false, "errMsg" : "This login is already used" }');	  	
		res.end();
	  }
	  else {
		connection.query("INSERT INTO mtg.mtgusers SET ?", nodeDatas, function(err, result) {
		 	  if (err) {
				res.write('{"success" : false, "errMsg" : "Database Error [login/signup : Q2]" }');	  	  	
				res.end();
			  } 
			  else {
			  	// Mise en session
			  	
			  	// Réponse
				res.write('{"success" : true, "successMsg" : "Account created !"}');	  	  	
				res.end();
			  }			
		});
	  }
	

	  //console.log('The solution is: ', rows[0].solution);
	});	

	


});


module.exports = router;