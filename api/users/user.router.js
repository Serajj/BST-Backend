const { createUser, getUserById, delUserById, loginUser } = require('./user.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

module.exports = router;