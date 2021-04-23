
const pool = require('../config/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { loginUser } = require('../api/users/user.service');


const indexView = (req, res, next) => {

    res.render('home', { 'username': req.session.name });
}

const mapView = (req, res, next) => {
    res.render('maps', { 'username': req.session.name });
}

const loginView = (req, res, next) => {
    res.render('login');
}

const driverView = (req, res, next) => {
    res.render('driver', { 'username': req.session.name });
}


const loginValidate = (req, res, next) => {



    const body = req.body;




    loginUser(body, (error, results) => {

        if (error) {
            console.log("Error while fetching user : " + error);
            return res.status(500).json({
                success: 0,
                message: "" + error
            });
        }
        if (results) {



            const result = compareSync(body.password, results.password);
            if (results.type != "admin") {
                res.status(200).json({
                    "message": "Access Denied , Please login to our app"
                })
            }
            if (result) {

                req.session.loggedin = true;
                req.session.serajisagoodprogrammer = "ofcourse";
                req.session.username = body.username;
                req.session.name = results.name;
                res.redirect('/admin');
            }
            else {
                res.send('Incorrect Password!');
            }


        } else {
            res.send('Please enter valid Username and Password!');
        }

    })





    // var username = req.body.username;
    // var password = req.body.password;
    // if (username && password) {
    //     pool.query('select * from users where username = ? or roll_no= ?', [username, username], function (error, results, fields) {
    //         if (results.length > 0) {
    //             console.log("working" + results)
    //             const mpass = compareSync(results.password, password);
    //             if (mpass) {
    //                 req.session.loggedin = true;
    //                 req.session.username = username;
    //                 res.redirect('/');
    //             } else {
    //                 res.send('Incorrect Password!');
    //             }
    //         } else {
    //             res.send('Incorrect Username and/or Password!');
    //         }

    //     });
    // } else {

    //     res.send('Please enter Username and Password!');
    //     res.end();
    // }
}


module.exports = {
    indexView,
    mapView,
    loginView,
    loginValidate,
    driverView

}