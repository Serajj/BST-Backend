const pool = require('../../config/database');
let alert = require('alert');


const route = () => {
    pool.query(
        'select * from routes',
        [

        ],
        (error, results, fields) => {
            var routes = [];
            if (error) {
                alert(error);


            }

            return results;
        }
    );
}


module.exports = route;