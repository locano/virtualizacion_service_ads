var express = require('express');
var router = express.Router();

const adsController = require('../controllers').ads_controller;


router.get('/', function(req, res){  
    console.log(req.query);
    adsController.getAdvertisers(req, res);
})

module.exports = router;