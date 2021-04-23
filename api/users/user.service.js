const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(
            'insert into users (username, name, email,password, route_no, roll_no) values (?,?,?,?,?,?)',
            [
                data.username,
                data.name,
                data.email,
                data.password,
                data.route_no,
                data.roll_no
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUser: (data, callback) => {
        pool.query(
            'select * from users where id= ?',
            [
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    deleteUser: (data, callback) => {
        pool.query(
            'delete from users where id= ?',
            [
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    loginUser: (data, callback) => {
        pool.query(
            'select * from users where username = ? or roll_no= ?',
            [
                data.username,
                data.username
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
}