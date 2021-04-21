

const router = require('express').Router();

const { indexView, mapView } = require('./homeController');


router.get('/', indexView);

router.get('/maps', mapView);

module.exports = router;