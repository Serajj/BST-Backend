

const router = require('express').Router();

const { indexView, mapView, loginView, loginValidate, driverView } = require('./homeController');
const { checkLogin } = require('../auth/checklogin');


router.get('/', checkLogin, indexView);

router.get('/login', loginView);

router.post('/login', loginValidate);

router.get('/maps', checkLogin, mapView);

router.get('/driver', checkLogin, driverView);




router.get('/logout', (req, res) => {
    //session destroy
    console.log(req.session.username)
    req.session.username = null;
    req.session.serajisagoodprogrammer = null;
    req.session.loggedin = false;
    res.redirect('/');
});





module.exports = router;