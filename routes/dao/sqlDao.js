/** Mysql * */
mysql = require('mysql');
config = require("../../conf/config");


db = config.database;
mysqlHost = db.host, mysqlUser = db.user, mysqlPass = db.password;
connection = mysql.createConnection({
	host : mysqlHost,
	user : mysqlUser,
	password : mysqlPass
});
connection.connect(function(err) {
	if (!err) {
		console.log("Database is connected ... \n\n");
	} else {
		console.log(err + "Error connecting database ... \n\n");
	}
});
	
module.exports = {	
		
		sqlQuery : function(q, callback) {

//	console.log(connection);
	//console.log(q);
		connection.query(q, function(err, rows, fields) {
			console.log("test1");
			if (err) {
				console.log("test2");
				//console.log(q);
				console.log(err);
				return null;
			} else {
				console.log("test3");
				//console.log(q);
	//			console.log(rows);
				callback(rows);
			}
		});
	}
}