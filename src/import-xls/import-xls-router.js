const express = require('express');
const Router = express.Router();

const importXlsController = require('./import-xls-controller');

Router.post('/', importXlsController.importXls);

module.exports = Router;