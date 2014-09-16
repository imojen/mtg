var express = require('express');
var router = express.Router();

/* Stop server */
router.get('/', function(req, res) {
	res.send('Stopping node server...');
	process.exit(1);
});

module.exports = router;
