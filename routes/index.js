var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({hi: "world"});
});

router.get('/auth', () => {
});

module.exports = router;
