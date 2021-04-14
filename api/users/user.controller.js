const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { create, getUser, deleteUser, loginUser } = require('./user.service');

const { sign } = require('jsonwebtoken')



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

    }
}