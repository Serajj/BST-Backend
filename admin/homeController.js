
const pool = require('../config/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { loginUser } = require('../api/users/user.service');
let alert = require('alert');


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

    pool.query(

        "select name, phone, address, city, state, pincode from drivers",
        [

        ],
        (error, drivers, fields) => {

            res.render('driver', { 'username': req.session.name, drivers: drivers });

        }
    );


}
const addDriverView = (req, res, next) => {
    res.render('addDriver', { 'username': req.session.name });
}


const addDriverViewPost = (req, res) => {
    const body = req.body;

    console.log("Hello I am approaching");
    console.log(body);

    pool.query(
        'insert into drivers (name, phone, address, city, state, pincode, password) values (?,?,?,?,?,?,?)',
        [
            body.name,
            body.phone,
            body.address,
            body.city,
            body.state,
            body.pincode,
            body.password,
        ],
        (error, results, fields) => {
            if (error) {
                alert(error);
                return res.render('driver', { 'username': req.session.name });
            }
            alert('Driver Added Successfully!!');
            return res.redirect('driver');
        }
    );

}




const busView = (req, res, next) => {
    res.render('buses', { 'username': req.session.name });
}

const addBusView = (req, res, next) => {
    res.render('addbus', { 'username': req.session.name });
}


const addBusPostView = (req, res, next) => {

    const body = req.body;
    console.log(body);
    pool.query(
        "INSERT INTO `buses`(`bus_no`, `bus_name`, `bus_type`, `capacity`) VALUES (?,?,?,?)",
        [
            body.bus_no,
            body.bus_name,
            body.bus_type,
            "All the best"
        ],
        (error, results, fields) => {
            if (error) {
                alert(error);
                res.render('bus', { 'username': req.session.name });
            }
            else {
            alert('Bus Added Successfully!!');
            res.redirect('bus');
            }
        }
    );

    // res.render('stops', { 'username': req.session.name });
}










const serviceView = (req, res, next) => {
    res.render('services', { 'username': req.session.name });

}

const addServiceView = (req, res, next) => {

    pool.query(

        "select route_name,id from routes",
        [

        ],
        (error, routes, fields) => {
            console.log(routes);
            pool.query(
                "select * from buses",
                [

                ],
                (error, buses, fields) => {

                    pool.query(
                        "select id,name,phone from drivers",
                        [

                        ],
                        (error, drivers, fields) => {
                            console.log(buses);
                            res.render('addservice', { 'username': req.session.name, drivers: drivers, buses, buses, routes: routes });

                        }
                    );

                }
            );

        }
    );





}


const addServicePostView = (req, res, next) => {

    const body = req.body;
    console.log(body);
    pool.query(
        "INSERT INTO `services`(`service_id`, `route_id`, `route_name`, `driver_id`, `driver_name`, `driver_phone`,`bus_no`) VALUES(?,?,?,?,?,?,?)",
        [
            body.service_no,
            body.route_id,
            body.route_name,
            body.driver_id,
            body.driver_name,
            body.driver_phone,
            body.bus_no,

        ],
        (error, results, fields) => {
            if (error) {
                alert(error);
                res.render('service', { 'username': req.session.name });
            }
            else {
            alert('Service Added Successfully!!');
            res.redirect('service');
            }
        }
    );

    // res.render('stops', { 'username': req.session.name });
}


const serviceData = (req, res, next) => {



    pool.query(
        'select * from services',
        [

        ],
        (error, results, fields) => {

            if (error) {

                res.status(200).json({ success: false, data: error });

            } else {
                res.status(200).json({ success: true, data: results });
            }



        }
    );



}


const routeView = (req, res, next) => {



    pool.query(
        'select * from routes',
        [

        ],
        (error, results, fields) => {
            var routes = [];
            if (error) {
                alert(error);


            } else {
                routes = results;
            }


            res.render('routes', { 'username': req.session.name, routes: routes });
        }
    );



}


const stoppageView = (req, res, next) => {
    var rid = req.body.route_id;
    var rname = req.body.route_name;
    console.log(rname);
    if (rid) {
        console.log(rid);
        req.session.routeid = rid;
        req.session.route_name = rname;
    } else {
        console.log("no rid");
    }

    pool.query(
        'select * from stops where route_id=?',
        [
            req.session.routeid
        ],
        (error, results, fields) => {
            var routes = [];
            if (error) {
                alert(error);


            } else {
                routes = results;
            }


            res.render('stops', { 'username': req.session.name, routes: routes, routename: rname });
        }
    );


    //res.render('stops', { 'username': req.session.name });
}

const addStoppageView = (req, res, next) => {

    res.render('addStops', { 'username': req.session.name });
}

const addStoppageViewPost = (req, res, next) => {

    const body = req.body;

    pool.query(
        'insert into stops (name,route_id,lattitude,longitude) values (?,?,?,?)',
        [
            body.stop_name,
            req.session.routeid,
            body.last_lattitude,
            body.last_longitude
        ],
        (error, results, fields) => {
            if (error) {
                alert(error);
                res.render('routes', { 'username': req.session.name });
            }
            alert('Stop Added Successfully!!');
            res.redirect('stoppage');
        }
    );

    // res.render('stops', { 'username': req.session.name });
}


// add data

const addRouteView = (req, res, next) => {
    res.render('addroute', { 'username': req.session.name });
}
const addRouteViewPost = (req, res, next) => {

    const body = req.body;

    pool.query(
        'insert into routes (route_name, last_lattitude, last_longitude) values (?,?,?)',
        [
            body.route_name,
            body.last_lattitude,
            body.last_longitude
        ],
        (error, results, fields) => {
            if (error) {
                alert(error);
                res.render('routes', { 'username': req.session.name });
            }
            alert('Route Added Successfully!!');
            res.redirect('routes');
        }
    );


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




const testApi = (req, res, next) => {

    pool.query(

        "select * from buses",
        [

        ],
        (error, routes, fields) => {
            res.json({
                error:error,
                routes:routes
            });
        }
    );
}



module.exports = {
    indexView,
    mapView,
    loginView,
    loginValidate,
    driverView,
    addDriverView,
    addDriverViewPost,
    busView,
    routeView,
    stoppageView,
    addRouteView,
    addRouteViewPost,
    addStoppageView,
    addStoppageViewPost,
    addBusView,
    addBusPostView,
    serviceView,
    serviceData,
    addServiceView,
    addServicePostView,
    testApi

}