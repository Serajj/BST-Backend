const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { create, getUser, deleteUser, loginUser } = require('./user.service');
const pool = require('../../config/database');
const { sign } = require('jsonwebtoken')



const getQuardinates = (req, res, next) => {
console.log(req.body);
    if(!req.body.sid){
        return res.status(200).json({
            status: 0,
            data: [],
            message: "Please provide Service ID first"
        })
    }


    pool.query(
        'select route_id from services where service_id= ?',
        [
          req.body.sid
        ],
        (error, results, fields) => {

            if (error || results.length ==0) {

                return res.status(200).json({
                    status: 0,
                    data: [],
                    message: "Invalid ID : " +error
                })

            } else {
                var rid=results[0].route_id;

                pool.query(
                    'SELECT stops.name,stops.lattitude, stops.longitude , routes.last_lattitude , routes.last_longitude FROM stops INNER JOIN routes ON stops.route_id = routes.id WHERE stops.route_id = ?',
                    [
                      rid
                    ],
                    (error, results, fields) => {
        
                        if (error) {
                            return res.status(200).json({
                                status: 0,
                                data: [],
                                message: "Invalid ID : " +error
                            })
                        }else{

                            return res.status(200).json({
                                status: 1,
                                data:results ,
                                message: "Stops coordinates !!"
                            })
                        }
                        
                    }
                );


                
            }



        }
    );



}


const updateData = (req, res, next) => {
    console.log(req.body);
        if(!req.body.sid || !req.body.current_lat || !req.body.current_long || !req.body.current_stop || !req.body.next_stop || !req.body.status){
            return res.status(200).json({
                status: 0,
                data: [],
                message: "Please provide all details : current_lat , current_long, current_stop , next_stop , status, sid"
            })
        }
    
    
        pool.query(
            'select route_id from services where service_id= ?',
            [
              req.body.sid
            ],
            (error, results, fields) => {
    
                if (error || results.length ==0) {
    
                    return res.status(200).json({
                        status: 0,
                        data: [],
                        message: "Invalid ID : " +error
                    })
    
                }     
            }
        );

        pool.query(
            'UPDATE `services` SET `current_lat`= ? ,`current_long`=?,`current_stop`= ?,`next_stop`= ?,`status`= ? WHERE service_id= ?',
            [
                req.body.current_lat,
                req.body.current_long,
                req.body.current_stop,
                req.body.next_stop,
                req.body.status,
                req.body.sid
            ],
            (error, results, fields) => {
    
                if (error || results.length ==0) {
    
                    return res.status(200).json({
                        status: 0,
                        data: [],
                        message: "Invalid ID : " +error
                    })
    
                }else{
                    return res.status(200).json({
                        status: 1,
                        message: "Updated"
                    })
                }     
            }
        );
    
    
    
    }


const getData = (req, res, next) => {
        console.log(req.body);
            if(!req.body.sid ){
                return res.status(200).json({
                    status: 0,
                    data: [],
                    message: "Please provide sid"
                })
            }
        
        
            pool.query(
                'select * from services where service_id= ?',
                [
                  req.body.sid
                ],
                (error, results, fields) => {
        
                    if (error || results.length ==0) {
        
                        return res.status(200).json({
                            status: 0,
                            data: [],
                            message: "Invalid ID : " +error
                        })
        
                    }else{
                        return res.status(200).json({
                            status: 1,
                            data:results,
                            message: "Fetched successfully!"
                        })
                    }    
                }
            );
  
        }

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        console.log(body);

        const salt = genSaltSync(10);

        body.password = hashSync(body.password, salt);

        create(body, (error, results) => {

            if (error) {
                console.log("Error while creating user : " + error);
                return res.status(500).json({
                    success: 0,
                    message: "" + error
                });
            }
            return res.status(200).json({
                status: 1,
                data: results,
                message: "User Created Successfully !!"
            })


        })
    },

    getUserById: (req, res) => {
        const body = req.body;

        console.log(body);

        getUser(body, (error, results) => {

            if (error) {
                console.log("Error while fetching user : " + error);
                return res.status(500).json({
                    success: 0,
                    message: "" + error
                });
            }
            if (results) {
                return res.status(200).json({
                    status: 1,
                    data: [results],
                    message: "User Created Successfully !!"
                })
            } else {
                return res.status(200).json({
                    status: 0,
                    data: [results],
                    message: "User doesn't exist !!"
                })
            }

        })

    },

    delUserById: (req, res) => {
        const body = req.body;

        deleteUser(body, (error, results) => {
            if (error) {
                console.log("Error while deleting user : " + error);
                return res.status(500).json({
                    success: 0,
                    message: "" + error
                });
            }
            return res.status(200).json({
                status: 1,
                data: results,
                message: "User deleted Successfully !!"
            })
        })
    },

    loginUser: (req, res) => {
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
                if (result) {
                    results.password = undefined;
                    const jsontoken = sign({ result: results }, "KeepDoingBroIwillBuyAcoffeeForyou@123", {
                        expiresIn: "1h"
                    });

                    return res.status(200).json({
                        success: 1,
                        data: [results],
                        message: "Login successfully",
                        token: jsontoken
                    });

                }
                else {
                    return res.status(200).json({
                        success: 0,
                        data: [],
                        message: "Incorrect Password",
                        token: null
                    });
                }


            } else {
                return res.status(200).json({
                    success: 0,
                    data: [],
                    message: "User doesn't exist !",
                    token: null
                });
            }

        })

    },
    getQuardinates,
    updateData,
    getData
}