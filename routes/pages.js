var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();


/* Home page **/
router.get('/:name', function(req, res) {
	var fileName = req.params.name;
	fs.readFile( path.resolve( './public/views/'+fileName+'.html') , function read(err, data) {
		if( err )
			throw err;
    	content = data;
    	res.write(data);
		res.end();
	});
});





module.exports = router;