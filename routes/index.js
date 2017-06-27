var express = require('express');
var router = express.Router();
 
var ads_route = require('./ads');
router.use('/ads', ads_route);
 
//API start
router.get('/', function(req, res) {
  res.status(200).send({
    message: 'Bienvenido al API de su Microservicio',
  });
});
 
module.exports = router;