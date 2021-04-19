const { createUser, getUserById, delUserById, loginUser } = require('./user.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/register', createUser);

router.post('/getUser', checkToken, getUserById);

router.post('/deleteUser', checkToken, delUserById);

router.post('/login', loginUser);

module.exports = router;