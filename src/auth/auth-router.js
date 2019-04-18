const express = require('express');
const Router = express.Router();
const AuthController = require('./auth-controller');

Router.post('/authenticate', AuthController.authenticate);

module.exports = Router;