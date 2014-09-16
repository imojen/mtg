var express = require('express');
var router = express.Router();

/* Stop server */
router.get('/quit', function(req, res) {
  process.exit(1);
});

module.exports = router;
