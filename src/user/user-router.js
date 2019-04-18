const express = require('express');
const Router = express.Router();
const UserController = require('./user-controller');

Router.post("/", UserController.newUser);

module.exports = Router;