const express = require('express');
const router = express.Router();

const importXlsController = require('./import-xls-controller');

router.post('/', importXlsController.impotarXls);

module.exports = router;