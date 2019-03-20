const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');
const fileUpload = require('express-fileupload');

// Instância do app
const app = express();

// Habilita o log
app.use(morgan('dev'));

// Habilita cors
app.use(cors());

//Habilita o fileupload
app.use(fileUpload());

// Configura o body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Carrega o mongoose
mongoose.connect(config.database);

// Carrega as rotas
const mainRoute = require('./app-router');
const importXlsRoute = require('./import-xls/import-xls-router');

app.use('/', mainRoute);
app.use('/importxls', importXlsRoute);

module.exports = app;