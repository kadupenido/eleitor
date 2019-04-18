const express = require('express');
const Router = express.Router();
const VoterController = require('./voter-controller');
const AuthController = require('../auth/auth-controller');

Router.get("/", AuthController.authorize, VoterController.getVoters);

module.exports = Router;