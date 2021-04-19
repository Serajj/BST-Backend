const router = require('express').Router();

router.get('/', (req, res) => {

    res.status(200).json({

        "message": "welcome admin"
    });

});



module.exports = router;