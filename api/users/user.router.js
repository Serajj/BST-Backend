const { createUser, getUserById, delUserById, loginUser, getQuardinates, updateData, getData } = require('./user.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/register', createUser);

router.post('/getUser', checkToken, getUserById);

router.post('/deleteUser', checkToken, delUserById);

router.post('/login', loginUser);

router.post('/getCoordinates', getQuardinates);

router.post('/updateData', updateData);
router.post('/getData', getData);




module.exports = router;