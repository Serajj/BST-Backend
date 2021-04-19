const router = require('express').Router();

router.get('/', (req, res) => {

    res.status(200).json({

        "message": "welcome admin"
    });

});

router.post('/getUser', checkToken, getUserById);

router.post('/deleteUser', checkToken, delUserById);

router.post('/login', loginUser);

module.exports = router;