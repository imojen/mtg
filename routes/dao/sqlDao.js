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
			if (err) {
				console.log(err);
				return null;
			} else {
				callback(rows);
			}
		});
	}
}