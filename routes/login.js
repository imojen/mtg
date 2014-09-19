var express = require('express');
var router = express.Router();


/* Login **/
router.post('/', function(req, res) {
	// Tests...

	var nodeDatas = JSON.parse(req.body.nodeDatas);

	// Connexion Ok
	res.write('{"success" : true}');
	console.log(nodeDatas);
});


module.exports = router;