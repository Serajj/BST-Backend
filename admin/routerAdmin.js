

const router = require('express').Router();

const { indexView } = require('./homeController');


router.get('/', indexView);

module.exports = router;