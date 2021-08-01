

const router = require('express').Router();


const { indexView, mapView, loginView, loginValidate, driverView, routeView, busView, stoppageView, addRouteView, addRouteViewPost, addStoppageView, addStoppageViewPost, addBusView, serviceView, serviceData, addServiceView, addDriverView, addDriverPostView, addDriverViewPost, addBusPostView, testApi, addServicePostView } = require('./homeController');
const { checkLogin } = require('../auth/checklogin');
const pool = require('../config/database');
const alert = require('alert');

router.get('/test', testApi);

router.get('/', checkLogin, indexView);

router.get('/login', loginView);

router.post('/login', loginValidate);

router.get('/maps', checkLogin, mapView);

router.get('/driver', checkLogin, driverView);
router.get('/addDriver', checkLogin, addDriverView)
router.post('/addDriver', checkLogin, addDriverViewPost);


router.get('/routes', checkLogin, routeView);

router.get('/bus', checkLogin, busView);
router.get('/addBus', checkLogin, addBusView)
router.post('/addBus', checkLogin, addBusPostView)




router.all('/stoppage', checkLogin, stoppageView);

router.get('/addStoppage', checkLogin, addStoppageView);
router.post('/addStoppage', checkLogin, addStoppageViewPost);

router.get('/addRoute', checkLogin, addRouteView);

router.post('/addRoute', checkLogin, addRouteViewPost);

router.get('/service', checkLogin, serviceView);

router.get('/addService', checkLogin, addServiceView);

router.post('/addService', checkLogin, addServicePostView);


router.get('/getServiceData', checkLogin, serviceData);





router.get('/logout', (req, res) => {
    //session destroy
    console.log(req.session.username)
    req.session.username = null;
    req.session.serajisagoodprogrammer = null;
    req.session.loggedin = false;
    res.redirect('/');
});





module.exports = router;