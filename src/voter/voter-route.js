const express = require('express');
const Router = express.Router();
const VoterController = require('./voter-controller');
const AuthController = require('../auth/auth-controller');

Router.post("/", AuthController.authorize, VoterController.getVoters);
Router.get("/:id", AuthController.authorize, VoterController.getVoter);
Router.post("/:id", AuthController.authorize, VoterController.saveVoter);
Router.delete("/:id", AuthController.authorize, VoterController.deleteVoter);

module.exports = Router;